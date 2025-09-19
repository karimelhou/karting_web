import { LightboxGallery } from '@/components/ui/Lightbox';
import { GALLERY_IMAGES } from '@/lib/constants';

export default function GaleriePage() {
  return (
    <div className="container-grid space-y-8 pb-20">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] text-primary/80">Galerie</p>
        <h1 className="section-heading">Images & vidéos</h1>
        <p className="text-muted-foreground">
          Actualisez cette sélection avec vos shootings, vidéos drone et contenus sociaux.
        </p>
      </header>
      <LightboxGallery items={GALLERY_IMAGES} />
    </div>
  );
}
