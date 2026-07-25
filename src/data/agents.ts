export interface AgentProfile {
  slug: string;
  name: string;
  agency: string;
  reraId: string;
  rating: number;
  reviewsCount: number;
  experienceYears: number;
  dealsClosed: number;
  phone: string;
  whatsapp: string;
  email: string;
  localities: string[];
  bio: string;
  verified: boolean;
  avatarUrl?: string;
}

export const VERIFIED_AGENTS: AgentProfile[] = [
  {
    slug: "rahul-patel",
    name: "Rahul Patel",
    agency: "Apex Realty Solutions",
    reraId: "PR/GJ/AHMEDABAD/AG/01928/2021",
    rating: 4.9,
    reviewsCount: 142,
    experienceYears: 12,
    dealsClosed: 320,
    phone: "+91 98765 43210",
    whatsapp: "919876543210",
    email: "rahul.patel@apexrealty.in",
    localities: ["Bopal", "South Bopal", "Shela", "Ambli"],
    bio: "Specializing in premium residential 3 & 4 BHK apartments and land acquisition in Bopal and Shela. Trusted advisor for over 300+ families.",
    verified: true,
    avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"
  },
  {
    slug: "priya-shah",
    name: "Priya Shah",
    agency: "Capital Assets & Investments",
    reraId: "PR/GJ/GANDHINAGAR/AG/08821/2022",
    rating: 4.8,
    reviewsCount: 98,
    experienceYears: 9,
    dealsClosed: 195,
    phone: "+91 98234 56789",
    whatsapp: "919823456789",
    email: "priya@capitalassets.in",
    localities: ["GIFT City", "Sargasan", "Kudasan", "Infocity"],
    bio: "GIFT City commercial leasing specialist and high-yield NRI investment advisor.",
    verified: true,
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
  },
  {
    slug: "vikram-desai",
    name: "Vikram Desai",
    agency: "Heritage & Modern Spaces",
    reraId: "PR/GJ/AHMEDABAD/AG/05541/2020",
    rating: 5.0,
    reviewsCount: 215,
    experienceYears: 16,
    dealsClosed: 480,
    phone: "+91 99123 45678",
    whatsapp: "919912345678",
    email: "vikram@heritagespaces.com",
    localities: ["Science City", "Sindhu Bhavan Road", "Bodakdev", "Vastrapur"],
    bio: "Ultra-luxury penthouses and commercial showroom advisor along SBR and Science City Road.",
    verified: true,
    avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80"
  }
];
