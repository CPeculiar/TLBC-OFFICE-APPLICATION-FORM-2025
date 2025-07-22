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
        "/images/_MG_1546.jpg",
        "/images/_MG_7548.jpg",
        "/images/_MG_8003.jpg",
        "/images/_MG_8410.jpg",
        "/images/_MG_8412.jpg",
        "/images/_MG_8494.jpg",
        "/images/_MG_9494.jpg",
        "/images/_MG_1546.jpg",
        "/images/_MG_75481.jpg",
        "/images/_MG_75482.jpg",
        "/images/_MG_1596.jpg",
        "/images/_MG_8412.jpg",
      ]
    },
    {
      year: "2023",
      theme: "Immortality", 
      description: "The Convocation held at Faithful Camp Uke, Anambra State and it recorded great success. We received teachings on IMMORTALITY and we were blessed.",
      images: [
        "/images/image43.jpg",
        "/images/image44.jpg",
        "/images/image45.jpg",
        "/images/image46.jpg",
        "/images/image47.jpg",
        "/images/image48.jpg",
        "/images/image43.jpg",
        "/images/image44.jpg",
        "/images/image45.jpg",
        "/images/image46.jpg",
        "/images/image47.jpg",
        "/images/image48.jpg",
      ]
    },
    {
      year: "2022",
      theme: "The City of God",
      description: "Reverend Elochukwu Udegbunam took us on the subject called The City of God and we were blessed. The Convocation recorded great success. Glory to God.",
      images: [
        "/images/image37.jpg",
        "/images/image38.jpg",
        "/images/image39.jpg",
        "/images/image40.jpg",
        "/images/image41.jpg",
        "/images/image42.jpg",
        "/images/image37.jpg",
        "/images/image38.jpg",
        "/images/image39.jpg",
        "/images/image40.jpg",
        "/images/image41.jpg",
        "/images/image42.jpg",
      ]
    },
     {
      year: "2021",
      theme: "The City of God",
      description: "Reverend Elochukwu Udegbunam took us on the subject called The City of God and we were blessed. The Convocation recorded great success. Glory to God.",
      images: [
       "/images/image31.jpg",
        "/images/image32.jpg",
        "/images/image33.jpg",
        "/images/image34.jpg",
        "/images/image35.jpg",
        "/images/image36.jpg",
        "/images/image31.jpg",
        "/images/image32.jpg",
        "/images/image33.jpg",
        "/images/image34.jpg",
        "/images/image35.jpg",
        "/images/image36.jpg",
      ]
    },
     {
      year: "2020",
      theme: "The City of God",
      description: "Reverend Elochukwu Udegbunam took us on the subject called The City of God and we were blessed. The Convocation recorded great success. Glory to God.",
      images: [
        "/images/image25.jpg",
        "/images/image26.jpg",
        "/images/image27.jpg",
        "/images/image28.jpg",
        "/images/image29.jpg",
        "/images/image30.jpg",
        "/images/image25.jpg",
        "/images/image26.jpg",
        "/images/image27.jpg",
        "/images/image28.jpg",
        "/images/image29.jpg",
        "/images/image30.jpg",
      ]
    },
     {
      year: "2019",
      theme: "The City of God",
      description: "Reverend Elochukwu Udegbunam took us on the subject called The City of God and we were blessed. The Convocation recorded great success. Glory to God.",
      images: [
        "/images/image19.jpg",
        "/images/image20.jpg",
        "/images/image21.jpg",
        "/images/image22.jpg",
        "/images/image23.jpg",
        "/images/image24.jpg",
         "/images/image19.jpg",
        "/images/image20.jpg",
        "/images/image21.jpg",
        "/images/image22.jpg",
        "/images/image23.jpg",
        "/images/image24.jpg",
      ]
    },
     {
      year: "2018",
      theme: "The City of God",
      description: "Reverend Elochukwu Udegbunam took us on the subject called The City of God and we were blessed. The Convocation recorded great success. Glory to God.",
      images: [
        "/images/image13.jpg",
        "/images/image14.jpg",
        "/images/image15.jpg",
        "/images/image16.jpg",
        "/images/image17.jpg",
        "/images/image18.jpg",
        "/images/image13.jpg",
        "/images/image14.jpg",
        "/images/image15.jpg",
        "/images/image16.jpg",
        "/images/image17.jpg",
        "/images/image18.jpg",
      ]
    },
     {
      year: "2017",
      theme: "The City of God",
      description: "Reverend Elochukwu Udegbunam took us on the subject called The City of God and we were blessed. The Convocation recorded great success. Glory to God.",
      images: [
        "/images/image7.jpg",
        "/images/image8.jpg",
        "/images/image9.jpg",
        "/images/image10.jpg",
        "/images/image11.jpg",
        "/images/image12.jpg",
        "/images/image7.jpg",
        "/images/image8.jpg",
        "/images/image9.jpg",
        "/images/image10.jpg",
        "/images/image11.jpg",
        "/images/image12.jpg",
      ]
    },
     {
      year: "2016",
      theme: "The City of God",
      description: "Reverend Elochukwu Udegbunam took us on the subject called The City of God and we were blessed. The Convocation recorded great success. Glory to God.",
      images: [
       "/images/image1.jpg",
        "/images/image2.jpg",
        "/images/image3.jpg",
        "/images/image4.jpg",
        "/images/image5.jpg",
        "/images/image6.jpg",
        "/images/image1.jpg",
        "/images/image2.jpg",
        "/images/image3.jpg",
        "/images/image4.jpg",
        "/images/image5.jpg",
        "/images/image6.jpg",
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