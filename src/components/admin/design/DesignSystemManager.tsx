'use client';

import { useState, useEffect } from 'react';
import { DesignSettings } from '@/lib/design/types';
import { DEFAULT_DESIGN_SETTINGS } from '@/lib/design/defaults';
import SectionDesigner from './SectionDesigner';
import ProductCardDesigner from './ProductCardDesigner';
import ProductDetailDesigner from './ProductDetailDesigner';
import PreviewPanel from './PreviewPanel';
import AccessibilityValidation from './AccessibilityValidation';
import DesignHistory from './DesignHistory';
import HistoryComparison from './HistoryComparison';
import DesignSystemErrorBoundary from './DesignSystemErrorBoundary';
import { DesignHistoryEntry } from '@/lib/design/types';
import { designSystemLogger } from '@/lib/design/error-logger';

type TabType = 'sections' | 'cards' | 'products' | 'history';

export default function DesignSystemManager() {
  const [activeTab, setActiveTab] = useState<TabType>('sections');
  const [settings, setSettings] = useState<DesignSettings>(DEFAULT_DESIGN_SETTINGS);
  const [selectedSection, setSelectedSection] = useState<'hero' | 'about' | 'products' | 'contact'>('hero');
  const [selectedProduct, setSelectedProduct] = useState<string>('readymixconcrete');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showAccessibility, setShowAccessibility] = useState(false);
  const [comparisonEntries, setComparisonEntries] = useState<[DesignHistoryEntry, DesignHistoryEntry] | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const response = await fetch('/api/admin/design-settings');
      if (response.ok) {
        const data = await response.json();
        setSettings(data.data || data.settings || DEFAULT_DESIGN_SETTINGS);
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
      designSystemLogger.error('DesignSystemManager', 'Failed to load design settings', error as Error);
      showNotification('error', 'Failed to load design settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/admin/design-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          settings,
          author: 'admin',
          description: 'Manual save from design system manager'
        })
      });

      if (response.ok) {
        showNotification('success', 'Design settings saved successfully (history entry created)');
        // Reload settings to get the updated timestamp
        await loadSettings();
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      console.error('Failed to save settings:', error);
      showNotification('error', 'Failed to save design settings');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset to default settings? This cannot be undone.')) {
      setSettings(DEFAULT_DESIGN_SETTINGS);
      showNotification('success', 'Settings reset to defaults');
    }
  };

  const handleExport = async () => {
    try {
      const response = await fetch('/api/admin/design-settings/export', {
        method: 'POST'
      });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `design-settings-${Date.now()}.json`;
      a.click();
      showNotification('success', 'Settings exported successfully');
    } catch (error) {
      console.error('Failed to export settings:', error);
      showNotification('error', 'Failed to export settings');
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const imported = JSON.parse(text);
      
      const response = await fetch('/api/admin/design-settings/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings: imported })
      });

      if (response.ok) {
        setSettings(imported);
        showNotification('success', 'Settings imported successfully');
      } else {
        throw new Error('Failed to import');
      }
    } catch (error) {
      console.error('Failed to import settings:', error);
      showNotification('error', 'Failed to import settings');
    }
  };

  const handleRollback = async (entryId: string) => {
    setSaving(true);
    try {
      const response = await fetch('/api/admin/design-history/rollback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entryId })
      });

      if (response.ok) {
        const data = await response.json();
        setSettings(data.settings);
        showNotification('success', 'Successfully rolled back to previous version');
        // Switch to sections tab to show the changes
        setActiveTab('sections');
      } else {
        throw new Error('Failed to rollback');
      }
    } catch (error) {
      console.error('Failed to rollback:', error);
      showNotification('error', 'Failed to rollback to previous version');
    } finally {
      setSaving(false);
    }
  };

  const handleCompare = (entry1: DesignHistoryEntry, entry2: DesignHistoryEntry) => {
    setComparisonEntries([entry1, entry2]);
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const tabs = [
    { id: 'sections' as TabType, label: 'Sections', icon: '📄' },
    { id: 'cards' as TabType, label: 'Product Cards', icon: '🃏' },
    { id: 'products' as TabType, label: 'Product Details', icon: '📦' },
    { id: 'history' as TabType, label: 'History', icon: '🕐' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Loading design settings...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Design System</h2>
            <p className="text-sm text-gray-600 mt-1">
              Customize the visual appearance of your website
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowAccessibility(!showAccessibility)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                showAccessibility
                  ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              title="Toggle accessibility validation"
            >
              ♿ A11y
            </button>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                showPreview
                  ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              title="Toggle preview panel"
            >
              👁️ Preview
            </button>
            <label className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
              Import
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </label>
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Export
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
            >
              Reset
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className={`mb-6 p-4 rounded-lg ${
          notification.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          {notification.message}
        </div>
      )}

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 mb-6">
        <div className="flex gap-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Accessibility Validation */}
      {showAccessibility && (
        <div className="mb-6">
          <DesignSystemErrorBoundary 
            componentName="Accessibility Validation"
            showDetails={false}
            onError={(error) => {
              designSystemLogger.error('AccessibilityValidation', error.message, error);
            }}
          >
            <AccessibilityValidation settings={settings} />
          </DesignSystemErrorBoundary>
        </div>
      )}

      {/* Preview Panel */}
      {showPreview && (
        <div className="mb-6">
          <DesignSystemErrorBoundary 
            componentName="Preview Panel"
            showDetails={false}
            onError={(error) => {
              designSystemLogger.error('PreviewPanel', error.message, error);
            }}
          >
            <PreviewPanel settings={settings} />
          </DesignSystemErrorBoundary>
        </div>
      )}

      {/* Comparison Modal */}
      {comparisonEntries && (
        <HistoryComparison
          entry1={comparisonEntries[0]}
          entry2={comparisonEntries[1]}
          onClose={() => setComparisonEntries(null)}
          onRollback={handleRollback}
        />
      )}

      {/* Tab Content */}
      <div className="bg-gray-50 rounded-xl p-6">
        {activeTab === 'sections' && (
          <DesignSystemErrorBoundary 
            componentName="Section Designer"
            showDetails={true}
            onError={(error, errorInfo) => {
              designSystemLogger.error('SectionDesigner', error.message, error, {
                componentStack: errorInfo.componentStack,
                selectedSection,
              });
            }}
          >
            <div className="space-y-6">
              {/* Section selector */}
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Section
                </label>
                <select
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value as any)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="hero">Hero Section</option>
                  <option value="about">About Section</option>
                  <option value="products">Products Section</option>
                  <option value="contact">Contact Section</option>
                </select>
              </div>

              <SectionDesigner
                sectionId={selectedSection}
                config={settings.sections[selectedSection]}
                onChange={(config) => setSettings({
                  ...settings,
                  sections: { ...settings.sections, [selectedSection]: config }
                })}
              />
            </div>
          </DesignSystemErrorBoundary>
        )}

        {activeTab === 'cards' && (
          <DesignSystemErrorBoundary 
            componentName="Product Card Designer"
            showDetails={true}
            onError={(error, errorInfo) => {
              designSystemLogger.error('ProductCardDesigner', error.message, error, {
                componentStack: errorInfo.componentStack,
              });
            }}
          >
            <ProductCardDesigner
              config={settings.productCards}
              onChange={(config) => setSettings({ ...settings, productCards: config })}
            />
          </DesignSystemErrorBoundary>
        )}

        {activeTab === 'products' && (
          <DesignSystemErrorBoundary 
            componentName="Product Detail Designer"
            showDetails={true}
            onError={(error, errorInfo) => {
              designSystemLogger.error('ProductDetailDesigner', error.message, error, {
                componentStack: errorInfo.componentStack,
                selectedProduct,
              });
            }}
          >
            <div className="space-y-6">
              {/* Product selector */}
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Product
                </label>
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="readymixconcrete">Ready Mix Concrete</option>
                  <option value="precast">Precast</option>
                  <option value="groutingagent">Grouting Agent</option>
                  <option value="waterproofagent">Waterproof Agent</option>
                </select>
              </div>

              <ProductDetailDesigner
                productSlug={selectedProduct}
                config={settings.productDetails[selectedProduct] || {
                productSlug: selectedProduct,
                hero: {
                  background: { type: 'color', value: '#ffffff' },
                  overlay: { color: '#000000', opacity: 0.5 }
                },
                content: {
                  background: { type: 'color', value: '#ffffff' },
                  fonts: {
                    heading: DEFAULT_DESIGN_SETTINGS.globalFonts.primary,
                    body: DEFAULT_DESIGN_SETTINGS.globalFonts.primary,
                    specs: DEFAULT_DESIGN_SETTINGS.globalFonts.monospace
                  },
                  colors: {
                    heading: { value: '#111827', opacity: 1 },
                    body: { value: '#374151', opacity: 1 },
                    accent: { value: '#667eea', opacity: 1 },
                    specLabel: { value: '#6b7280', opacity: 1 },
                    specValue: { value: '#111827', opacity: 1 }
                  }
                },
                gallery: {
                  thumbnailSize: '80px',
                  spacing: '0.5rem',
                  borderRadius: 8,
                  lightboxBackground: 'rgba(0, 0, 0, 0.9)'
                },
                sections: {
                  specifications: {
                    background: { type: 'color', value: '#f9fafb' },
                    padding: { mobile: '2rem', tablet: '3rem', desktop: '4rem' },
                    borderRadius: 12,
                    shadow: 'none'
                  },
                  applications: {
                    background: { type: 'color', value: '#ffffff' },
                    padding: { mobile: '2rem', tablet: '3rem', desktop: '4rem' },
                    borderRadius: 12,
                    shadow: 'none'
                  },
                  features: {
                    background: { type: 'color', value: '#f9fafb' },
                    padding: { mobile: '2rem', tablet: '3rem', desktop: '4rem' },
                    borderRadius: 12,
                    shadow: 'none'
                  }
                }
              }}
              onChange={(config) => setSettings({
                ...settings,
                productDetails: { ...settings.productDetails, [selectedProduct]: config }
              })}
            />
            </div>
          </DesignSystemErrorBoundary>
        )}

        {activeTab === 'history' && (
          <DesignSystemErrorBoundary 
            componentName="Design History"
            showDetails={true}
            onError={(error, errorInfo) => {
              designSystemLogger.error('DesignHistory', error.message, error, {
                componentStack: errorInfo.componentStack,
              });
            }}
          >
            <DesignHistory
              onRollback={handleRollback}
              onCompare={handleCompare}
            />
          </DesignSystemErrorBoundary>
        )}
      </div>
    </div>
  );
}
