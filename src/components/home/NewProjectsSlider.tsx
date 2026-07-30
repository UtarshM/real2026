"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";

export default function NewProjectsSlider() {
  const newProjects = [
    {
      id: "np-1",
      title: "Turquoise Rosedale",
      builder: "Ratna Group",
      config: "3, 2 BHK Flat/Apartment",
      locality: "Shela, Ahmedabad",
      price: "Price On Request",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "np-2",
      title: "Swastik Ashoka",
      builder: "RMG Group & Swastik",
      config: "3 BHK & 4 BHK Apartments",
      locality: "Mithakhali, Ahmedabad",
      price: "Price On Request",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "np-3",
      title: "IDEAL IRIS",
      builder: "HARVY REALTY LLP",
      config: "2 BHK Flat/Apartment",
      locality: "Vaishno Devi Circle, Ahmedabad",
      price: "₹ 49.95 Lac Onwards",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "np-4",
      title: "The Amber Dobariya",
      builder: "Godrej Garden City Partner",
      config: "3 BHK Luxury Flats",
      locality: "Jagatpur, Ahmedabad",
      price: "₹ 72.00 Lac Onwards",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % newProjects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + newProjects.length) % newProjects.length);
  };

  return (
    <section className="bg-slate-50 py-12 font-sans border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
              New Projects
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">Newly launched premium residential properties in prime corridors</p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full border border-slate-300 bg-white hover:bg-slate-100 flex items-center justify-center transition cursor-pointer shadow-xs"
              aria-label="Previous Project"
            >
              <ChevronLeft className="w-5 h-5 text-slate-700" />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full border border-slate-300 bg-white hover:bg-slate-100 flex items-center justify-center transition cursor-pointer shadow-xs"
              aria-label="Next Project"
            >
              <ChevronRight className="w-5 h-5 text-slate-700" />
            </button>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newProjects.map((project) => (
            <div 
              key={project.id}
              className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 flex flex-col justify-between"
            >
              <div className="relative h-52 bg-slate-900">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <h3 className="text-lg font-black text-slate-900 font-display leading-tight">{project.title}</h3>
                  <p className="text-xs font-extrabold text-slate-500">By {project.builder}</p>
                  <p className="text-xs font-semibold text-slate-600">{project.config}</p>
                  <p className="text-xs font-bold text-slate-500 flex items-center space-x-1 pt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#ea580c]" />
                    <span>{project.locality}</span>
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-black text-[#ea580c]" style={{ color: "#ea580c" }}>{project.price}</span>
                  <Link
                    href={`/search?query=${encodeURIComponent(project.title)}`}
                    className="text-[11px] font-extrabold text-slate-700 hover:text-[#ea580c] transition"
                  >
                    Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
