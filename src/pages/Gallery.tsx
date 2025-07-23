import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// 2024 images
import img2024_1 from '/images/img2024_1.jpg';
import img2024_2 from '/images/img2024_2.jpg';
import img2024_3 from '/images/img2024_3.jpg';
import img2024_4 from '/images/img2024_4.jpg';
import img2024_5 from '/images/img2024_5.jpg';
import img2024_6 from '/images/img2024_6.jpg';
import img2024_7 from '/images/img2024_7.jpg';
import img2024_8 from '/images/img2024_8.jpg';
import img2024_9 from '/images/img2024_9.jpg';
import img2024_10 from '/images/img2024_10.jpg';
import img2024_11 from '/images/img2024_11.jpg';
import img2024_12 from '/images/img2024_12.jpg';

import img2023_1 from '/images/img2023_1.jpg';
import img2023_2 from '/images/img2023_2.jpg';
import img2023_3 from '/images/img2023_3.jpg';
import img2023_4 from '/images/img2023_4.jpg';
import img2023_5 from '/images/img2023_5.jpg';
import img2023_6 from '/images/img2023_6.jpg';
import img2023_7 from '/images/img2023_7.jpg';
import img2023_8 from '/images/img2023_8.jpg';
import img2023_9 from '/images/img2023_9.jpg';
import img2023_10 from '/images/img2023_10.jpg';
import img2023_11 from '/images/img2023_11.jpg';
import img2023_12 from '/images/img2023_12.jpg';

import img2022_1 from '/images/img2022_1.jpg';
import img2022_2 from '/images/img2022_2.jpg';
import img2022_3 from '/images/img2022_3.jpg';
import img2022_4 from '/images/img2022_4.jpg';
import img2022_5 from '/images/img2022_5.jpg';
import img2022_6 from '/images/img2022_6.jpg';
import img2022_7 from '/images/img2022_7.jpg';
import img2022_8 from '/images/img2022_8.jpg';
import img2022_9 from '/images/img2022_9.jpg';
import img2022_10 from '/images/img2022_10.jpg';
import img2022_11 from '/images/img2022_11.jpg';
import img2022_12 from '/images/img2022_12.jpg';

import img2021_1 from '/images/img2021_1.jpg';
import img2021_2 from '/images/img2021_2.jpg';
import img2021_3 from '/images/img2021_3.jpg';
import img2021_4 from '/images/img2021_4.jpg';
import img2021_5 from '/images/img2021_5.jpg';
import img2021_6 from '/images/img2021_6.jpg';
import img2021_7 from '/images/img2021_7.jpg';
import img2021_8 from '/images/img2021_8.jpg';
import img2021_9 from '/images/img2021_9.jpg';
import img2021_10 from '/images/img2021_10.jpg';
import img2021_11 from '/images/img2021_11.jpg';
import img2021_12 from '/images/img2021_12.jpg';

import img2020_1 from '/images/img2020_1.jpg';
import img2020_2 from '/images/img2020_2.jpg';
import img2020_3 from '/images/img2020_3.jpg';
import img2020_4 from '/images/img2020_4.jpg';
import img2020_5 from '/images/img2020_5.jpg';
import img2020_6 from '/images/img2020_6.jpg';
import img2020_7 from '/images/img2020_7.jpg';
import img2020_8 from '/images/img2020_8.jpg';
import img2020_9 from '/images/img2020_9.jpg';
import img2020_10 from '/images/img2020_10.jpg';
import img2020_11 from '/images/img2020_11.jpg';
import img2020_12 from '/images/img2020_12.jpg';

import img2019_1 from '/images/img2019_1.jpg';
import img2019_2 from '/images/img2019_2.jpg';
import img2019_3 from '/images/img2019_3.jpg';
import img2019_4 from '/images/img2019_4.jpg';
import img2019_5 from '/images/img2019_5.jpg';
import img2019_6 from '/images/img2019_6.jpg';
import img2019_7 from '/images/img2019_7.jpg';
import img2019_8 from '/images/img2019_8.jpg';
import img2019_9 from '/images/img2019_9.jpg';
import img2019_10 from '/images/img2019_10.jpg';
import img2019_11 from '/images/img2019_11.jpg';
import img2019_12 from '/images/img2019_12.jpg';

import img2018_1 from '/images/img2018_1.jpg';
import img2018_2 from '/images/img2018_2.jpg';
import img2018_3 from '/images/img2018_3.jpg';
import img2018_4 from '/images/img2018_4.jpg';
import img2018_5 from '/images/img2018_5.jpg';
import img2018_6 from '/images/img2018_6.jpg';
import img2018_7 from '/images/img2018_7.jpg';
import img2018_8 from '/images/img2018_8.jpg';
import img2018_9 from '/images/img2018_9.jpg';
import img2018_10 from '/images/img2018_10.jpg';
import img2018_11 from '/images/img2018_11.jpg';
import img2018_12 from '/images/img2018_12.jpg';

import img2017_1 from '/images/img2017_1.jpg';
import img2017_2 from '/images/img2017_2.jpg';
import img2017_3 from '/images/img2017_3.jpg';
import img2017_4 from '/images/img2017_4.jpg';
import img2017_5 from '/images/img2017_5.jpg';
import img2017_6 from '/images/img2017_6.jpg';
import img2017_7 from '/images/img2017_7.jpg';
import img2017_8 from '/images/img2017_8.jpg';
import img2017_9 from '/images/img2017_9.jpg';
import img2017_10 from '/images/img2017_10.jpg';
import img2017_11 from '/images/img2017_11.jpg';
import img2017_12 from '/images/img2017_12.jpg';

import img2016_1 from '/images/img2016_1.jpg';
import img2016_2 from '/images/img2016_2.jpg';
import img2016_3 from '/images/img2016_3.jpg';
import img2016_4 from '/images/img2016_4.jpg';
import img2016_5 from '/images/img2016_5.jpg';
import img2016_6 from '/images/img2016_6.jpg';
import img2016_7 from '/images/img2016_7.jpg';
import img2016_8 from '/images/img2016_8.jpg';
import img2016_9 from '/images/img2016_9.jpg';
import img2016_10 from '/images/img2016_10.jpg';
import img2016_11 from '/images/img2016_11.jpg';
import img2016_12 from '/images/img2016_12.jpg';


const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedSection, setSelectedSection] = useState<number>(0);

  // Gallery sections with themes and descriptions
  const gallerySections = [
    {
      year: "2024",
      theme: "The Law and The Prophets",
      description: "It was a truly remarkable experience for us at TLBC'24, held at Kingdom City Prayer Camp, Awka, Anambra State. The event was a great success, and we were blessed — we didn't return the same.",
      images: [
        img2024_1,
        img2024_2,
        img2024_3,
        img2024_4,
        img2024_5,
        img2024_6,
        img2024_7,
        img2024_8,
        img2024_9,
        img2024_10, 
        img2024_11,
        img2024_12,
      ]
    },
    {
      year: "2023",
      theme: "Immortality", 
      description: "The Convocation held at Faithful Camp Uke, Anambra State and it recorded great success. We received teachings on IMMORTALITY and we were blessed.",
      images: [
        img2023_1,
        img2023_2,
        img2023_3,
        img2023_4,
        img2023_5,
        img2023_6,
        img2023_7,
        img2023_8,
        img2023_9,
        img2023_10, 
        img2023_11,
        img2023_12,
      ]
    },
    {
      year: "2022",
      theme: "The City of God",
      description: "Our dear Man of God, Reverend Elochukwu Udegbunam took us on the subject called 'The City of God' and we were blessed. The Convocation recorded great success. Glory to God.",
      images: [
        img2022_1,
        img2022_2,
        img2022_3,
        img2022_4,
        img2022_5,
        img2022_6,
        img2022_7,
        img2022_8,
        img2022_9,
        img2022_10, 
        img2022_11,
        img2022_12,
      ]
    },
     {
      year: "2021",
       theme: "The Promise",
      description: "The Convocation held in Awka, Anambra State and it was a turning point in the lives of many. \nOur dear Man of God, Reverend Elochukwu Udegbunam took us on the subject titled: 'The Promise' and we were blessed. Glory to God.",
      images: [
       img2021_1,
        img2021_2,
        img2021_3,
        img2021_4,
        img2021_5,
        img2021_6,
        img2021_7,
        img2021_8,
        img2021_9,
        img2021_10, 
        img2021_11,
        img2021_12,
      ]
    },
     {
      year: "2020",
      theme: "The Two Men called the Sons of God",
      description: "Our Man of God, Reverend Elochukwu Udegbunam took us on a series titled: 'The Two Men called the Sons of God.' \nThe meeting educated and blessed us greatly. Glory to God.",
      images: [
        img2020_1,
        img2020_2,
        img2020_3,
        img2020_4,
        img2020_5,
        img2020_6,
        img2020_7,
        img2020_8,
        img2020_9,
        img2020_10, 
        img2020_11,
        img2020_12,
      ]
    },
     {
      year: "2019",
     theme: "ACTS",
      description: "Our dear Man of God, Reverend Elochukwu Udegbunam took us on a series titled: 'ACTS.' He showed us from the scriptures, \nthe response of the first generation of the Apostles of Jesus Christ. The meeting left us inspired and we were blessed. Glory to God.",
       images: [
        img2019_1,
        img2019_2,
        img2019_3,
        img2019_4,
        img2019_5,
        img2019_6,
        img2019_7,
        img2019_8,
        img2019_9,
        img2019_10, 
        img2019_11,
        img2019_12,
      ]
    },
     {
      year: "2018",
      theme: "The Kingdom, The Power and The Glory",
      description: "The Convocation took place in Awka and our dear Man of God, Reverend Elochukwu Udegbunam took us on the subject titled: 'The Kingdom, The Power and The Glory.' \nIt was a glorious moment with the word in TLBC'18 and we were educated and blessed. Glory to God.",
       images: [
        img2018_1,
        img2018_2,
        img2018_3,
        img2018_4,
        img2018_5,
        img2018_6,
        img2018_7,
        img2018_8,
        img2018_9,
        img2018_10, 
        img2018_11,
        img2018_12,
      ]
    },
     {
      year: "2017",
      theme: "The Great Commission",
      description: "It was a great and rich experience we had in TLBC'17. We call it 'The Lord's Brethren Experience.' \nOur Man of God, Reverend Elochukwu Udegbunam took us on a series titled: 'The Great Commission' and we were educated, inspired and blessed. Glory to God.",
      images: [
        img2017_1,
        img2017_2,
        img2017_3,
        img2017_4,
        img2017_5,
        img2017_6,
        img2017_7,
        img2017_8,
        img2017_9,
        img2017_10, 
        img2017_11,
        img2017_12,
      ]
    },
     {
      year: "2016",
     theme: "Presenting the Glorious Church",
      description: "TLBC'16 was a memorable one for us and will always be remembered in our journey as a Ministry. \nIt was the beginning of our Church Ministry and our first Convocation. Our dear Man of God, Reverend Elochukwu Udegbunam took us on the subject: 'Presenting the Glorious Church' and we were blessed. Glory to God.",
       images: [
        img2016_1,
        img2016_2,
        img2016_3,
        img2016_4,
        img2016_5,
        img2016_6,
        img2016_7,
        img2016_8,
        img2016_9,
        img2016_10, 
        img2016_11,
        img2016_12,
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
        {/* <div className="container mx-auto px-3 sm:px-4 lg:px-6"> */}
        <div className="container mx-auto px-4">
          {gallerySections.map((section, sectionIndex) => (
            <div key={section.year} className="mb-16 sm:mb-20">
              {/* Section Header */}
              <div className="text-center mb-8 sm:mb-12 animate-fade-in px-2">
                 <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display gradient-text mb-3 sm:mb-4">
                  TLBC {section.year}
                </h2>
                <h3 className="text-xl sm:text-2xl font-heading text-secondary mb-4 sm:mb-6 px-2">
                  Theme: {section.theme}
                </h3>
                <p className="text-base sm:text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed px-2">
                  {section.description}
                </p>
              </div>

              {/* Gallery Grid */}
                {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6"> */}
              <div className="gallery-grid">
                {section.images.map((image, imageIndex) => (
                  <div
                    key={imageIndex}
                    className="relative group rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer animate-scale-in bg-gray-100"
                    style={{ animationDelay: `${imageIndex * 100}ms` }}
                    onClick={() => openLightbox(sectionIndex, imageIndex)}
                  >
                    <img
                      src={image}
                      alt={`TLBC ${section.year} - Image ${imageIndex + 1}`}
                      className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-300 group-hover:scale-100"
                      loading="lazy"
                    />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 sm:p-4">
                      <div className="text-white w-full">
                        <h4 className="text-sm sm:text-lg font-semibold mb-1 sm:mb-2 truncate">TLBC {section.year}</h4>
                        <p className="text-xs sm:text-sm opacity-90 truncate">{section.theme}</p>
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
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center p-2 sm:p-4">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 text-white hover:bg-white/10 w-10 h-10 sm:w-12 sm:h-12 rounded-full"
              onClick={closeLightbox}
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </Button>

            {/* Previous Button */}
            {selectedImage > 0 && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/10 w-10 h-10 sm:w-12 sm:h-12 rounded-full"
                onClick={prevImage}
              >
                <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
              </Button>
            )}

            {/* Next Button */}
            {selectedImage < currentSection.images.length - 1 && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/10 w-10 h-10 sm:w-12 sm:h-12 rounded-full"
                onClick={nextImage}
              >
                <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
              </Button>
            )}

            {/* Image */}
            <img
              src={currentImage}
              alt={`TLBC ${currentSection.year} - Image ${selectedImage + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />

            {/* Image Info */}
            <div className="absolute bottom-2 sm:bottom-4 left-2 right-2 sm:left-4 sm:right-4 text-center text-white bg-black/50 rounded-lg p-2 sm:p-4 backdrop-blur-sm">
              <p className="text-sm sm:text-lg font-semibold mb-1 truncate px-2">
                TLBC {currentSection.year} - {currentSection.theme}
              </p>
              <p className="text-xs sm:text-sm opacity-80">
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