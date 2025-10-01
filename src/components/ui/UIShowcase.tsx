'use client';

import { 
  Button, 
  AnimatedSection, 
  LoadingSpinner, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent,
  Badge 
} from './index';

const UIShowcase = () => {
  return (
    <div className="min-h-screen bg-brand-light p-8 space-y-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-brand-dark mb-8 text-center">
          HYPERSTONE UI Components Showcase
        </h1>

        {/* Button Showcase */}
        <AnimatedSection animation="slideUp" delay={0.1}>
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Button Components</CardTitle>
              <CardDescription>Various button styles with brand colors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="sm">Primary Small</Button>
                <Button variant="primary" size="md">Primary Medium</Button>
                <Button variant="primary" size="lg">Primary Large</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Loading Spinner Showcase */}
        <AnimatedSection animation="slideUp" delay={0.2}>
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Loading Spinners</CardTitle>
              <CardDescription>Different sizes and colors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <LoadingSpinner size="sm" color="primary" />
                  <p className="mt-2 text-sm">Small Primary</p>
                </div>
                <div className="text-center">
                  <LoadingSpinner size="md" color="secondary" />
                  <p className="mt-2 text-sm">Medium Secondary</p>
                </div>
                <div className="text-center">
                  <LoadingSpinner size="lg" color="dark" />
                  <p className="mt-2 text-sm">Large Dark</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Badge Showcase */}
        <AnimatedSection animation="slideUp" delay={0.3}>
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Badge Components</CardTitle>
              <CardDescription>Status indicators and labels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Badge variant="default">Default</Badge>
                <Badge variant="primary">Primary</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="error">Error</Badge>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Animation Showcase */}
        <AnimatedSection animation="slideLeft" delay={0.4}>
          <Card variant="outlined">
            <CardHeader>
              <CardTitle>Animation Effects</CardTitle>
              <CardDescription>Scroll-based animations with different effects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatedSection animation="fadeIn" delay={0.1}>
                  <div className="p-4 bg-brand-primary text-white rounded-lg text-center">
                    Fade In Animation
                  </div>
                </AnimatedSection>
                <AnimatedSection animation="slideUp" delay={0.2}>
                  <div className="p-4 bg-brand-secondary text-white rounded-lg text-center">
                    Slide Up Animation
                  </div>
                </AnimatedSection>
                <AnimatedSection animation="slideLeft" delay={0.3}>
                  <div className="p-4 bg-brand-primary text-white rounded-lg text-center">
                    Slide Left Animation
                  </div>
                </AnimatedSection>
                <AnimatedSection animation="scaleIn" delay={0.4}>
                  <div className="p-4 bg-brand-secondary text-white rounded-lg text-center">
                    Scale In Animation
                  </div>
                </AnimatedSection>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Card Variants Showcase */}
        <AnimatedSection animation="slideRight" delay={0.5}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="default">
              <CardHeader>
                <CardTitle>Default Card</CardTitle>
                <CardDescription>Standard card with border</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">This is a default card variant with a simple border.</p>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Elevated Card</CardTitle>
                <CardDescription>Card with shadow effects</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">This card has elevation with shadow effects.</p>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardHeader>
                <CardTitle>Outlined Card</CardTitle>
                <CardDescription>Card with brand border</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">This card uses the brand primary color for borders.</p>
              </CardContent>
            </Card>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export { UIShowcase };