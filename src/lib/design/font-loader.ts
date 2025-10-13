export class FontLoader {
  private loadedFonts: Set<string> = new Set();

  async loadGoogleFont(family: string, weights: number[] = [400]): Promise<void> {
    const fontKey = `${family}-${weights.join(',')}`;
    
    if (this.loadedFonts.has(fontKey)) {
      return;
    }

    try {
      const weightsParam = weights.join(';');
      const fontUrl = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, '+')}:wght@${weightsParam}&display=swap`;
      
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = fontUrl;
      
      await new Promise<void>((resolve, reject) => {
        link.onload = () => resolve();
        link.onerror = () => reject(new Error(`Failed to load font: ${family}`));
        document.head.appendChild(link);
      });

      this.loadedFonts.add(fontKey);
    } catch (error) {
      console.error(`Failed to load Google Font ${family}:`, error);
      throw error;
    }
  }

  async loadPretendard(weights: string[] = ['400']): Promise<void> {
    const fontKey = `Pretendard-${weights.join(',')}`;
    
    if (this.loadedFonts.has(fontKey)) {
      return;
    }

    try {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css';
      
      await new Promise<void>((resolve, reject) => {
        link.onload = () => resolve();
        link.onerror = () => reject(new Error('Failed to load Pretendard'));
        document.head.appendChild(link);
      });

      this.loadedFonts.add(fontKey);
    } catch (error) {
      console.error('Failed to load Pretendard:', error);
      throw error;
    }
  }

  async loadGmarketSans(weights: string[] = ['Medium']): Promise<void> {
    const fontKey = `GmarketSans-${weights.join(',')}`;
    
    if (this.loadedFonts.has(fontKey)) {
      return;
    }

    try {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/gh/fonts-archive/GmarketSans/GmarketSans.css';
      
      await new Promise<void>((resolve, reject) => {
        link.onload = () => resolve();
        link.onerror = () => reject(new Error('Failed to load Gmarket Sans'));
        document.head.appendChild(link);
      });

      this.loadedFonts.add(fontKey);
    } catch (error) {
      console.error('Failed to load Gmarket Sans:', error);
      throw error;
    }
  }

  isLoaded(family: string): boolean {
    return Array.from(this.loadedFonts).some(key => key.startsWith(family));
  }

  getLoadedFonts(): string[] {
    return Array.from(this.loadedFonts);
  }
}

// Singleton instance
export const fontLoader = new FontLoader();
