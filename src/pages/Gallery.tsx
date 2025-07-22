import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedSection, setSelectedSection] = useState<number>(0);

  // Gallery sections with themes and descriptions
  const gallerySections = [
    {
      year: "2024",
      theme: "The Law and The Prophets",
      description: "It was a truly remarkable experience for us at The Convocation, held at Kingdom City Prayer Camp, Awka, Anambra State. The event was a great success, and we were deeply blessed — we didn't return the same.",
      images: [
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1415604934674-561df9abf539?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1559223607-b4d0555ae227?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      year: "2023",
      theme: "Immortality", 
      description: "The Convocation held at Faithful Camp Uke, Anambra State and it recorded great success. We received teachings on IMMORTALITY and we were blessed.",
      images: [
        "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      year: "2022",
      theme: "The City of God",
      description: "Reverend Elochukwu Udegbunam took us on the subject called The City of God and we were blessed. The Convocation recorded great success. Glory to God.",
      images: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ]
    }
  ];

  const openLightbox = (sectionIndex: number, imageIndex: number) => {
    setSelectedSection(sectionIndex);
    setSelectedImage(imageIndex);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null && selectedImage < gallerySections[selectedSection].images.length - 1) {
      setSelectedImage(selectedImage + 1);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null && selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    }
  };

  const currentSection = gallerySections[selectedSection];
  const currentImage = selectedImage !== null ? currentSection.images[selectedImage] : null;

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Event Gallery"
        subtitle="Relive the beautiful moments from our previous convocations"
        description="Witness the joy, worship, and fellowship that define The Lord's Brethren Convocation"
      />

      <div className="section-container">
        <div className="container mx-auto px-4">
          {gallerySections.map((section, sectionIndex) => (
            <div key={section.year} className="mb-20">
              {/* Section Header */}
              <div className="text-center mb-12 animate-fade-in">
                <h2 className="text-4xl md:text-5xl font-display gradient-text mb-4">
                  TLBC {section.year}
                </h2>
                <h3 className="text-2xl font-heading text-secondary mb-6">
                  Theme: {section.theme}
                </h3>
                <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                  {section.description}
                </p>
              </div>

              {/* Gallery Grid */}
              <div className="gallery-grid">
                {section.images.map((image, imageIndex) => (
                  <div
                    key={imageIndex}
                    className="gallery-item animate-scale-in cursor-pointer"
                    style={{ animationDelay: `${imageIndex * 100}ms` }}
                    onClick={() => openLightbox(sectionIndex, imageIndex)}
                  >
                    <img
                      src={image}
                      alt={`TLBC ${section.year} - Image ${imageIndex + 1}`}
                      className="w-full h-48 sm:h-56 md:h-64 object-cover"
                      loading="lazy"
                    />
                    <div className="gallery-overlay">
                      <div className="text-white">
                        <h4 className="text-lg font-semibold mb-2">TLBC {section.year}</h4>
                        <p className="text-sm opacity-90">{section.theme}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && currentImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 text-white hover:bg-white/10"
              onClick={closeLightbox}
            >
              <X className="w-6 h-6" />
            </Button>

            {/* Previous Button */}
            {selectedImage > 0 && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/10"
                onClick={prevImage}
              >
                <ChevronLeft className="w-8 h-8" />
              </Button>
            )}

            {/* Next Button */}
            {selectedImage < currentSection.images.length - 1 && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/10"
                onClick={nextImage}
              >
                <ChevronRight className="w-8 h-8" />
              </Button>
            )}

            {/* Image */}
            <img
              src={currentImage}
              alt={`TLBC ${currentSection.year} - Image ${selectedImage + 1}`}
              className="max-w-full max-h-full object-contain"
            />

            {/* Image Info */}
            <div className="absolute bottom-4 left-4 right-4 text-center text-white">
              <p className="text-lg font-semibold">TLBC {currentSection.year} - {currentSection.theme}</p>
              <p className="text-sm opacity-80">
                Image {selectedImage + 1} of {currentSection.images.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;