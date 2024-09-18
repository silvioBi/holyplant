'use client'

import { useState, useRef, useEffect, FormEvent, ChangeEvent } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { LeafIcon, MailIcon, CalendarIcon, HeartIcon } from "lucide-react"
import Image from 'next/image'
import { Alert, AlertDescription } from "@/components/ui/alert"

// Predefined list of world cities
const worldCities: string[] = [
  "New York, USA",
  "London, UK",
  "Paris, France",
  "Tokyo, Japan",
  "Sydney, Australia",
  "Berlin, Germany",
  "Rome, Italy",
  "Moscow, Russia",
  "Beijing, China",
  "Rio de Janeiro, Brazil",
  "Cairo, Egypt",
  "Mumbai, India",
  "Toronto, Canada",
  "Amsterdam, Netherlands",
  "Dubai, UAE",
  "Singapore, Singapore",
  "Stockholm, Sweden",
  "Seoul, South Korea",
  "Mexico City, Mexico",
  "Cape Town, South Africa"
];

interface FormData {
  email: string;
  interest: string;
  location: string;
  additionalInfo: string;
}

// Custom hook for city suggestions
function useCitySuggestions(inputRef: React.RefObject<HTMLInputElement>): string[] {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (!inputRef.current) return;

    const handleInput = () => {
      const query = inputRef.current?.value.toLowerCase() || '';
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      const filteredCities = worldCities.filter(city =>
          city.toLowerCase().includes(query)
      ).slice(0, 5); // Limit to 5 suggestions

      setSuggestions(filteredCities);
    };

    const debouncedHandleInput = debounce(handleInput, 300);
    inputRef.current.addEventListener('input', debouncedHandleInput);

    return () => {
      inputRef.current?.removeEventListener('input', debouncedHandleInput);
    };
  }, [inputRef]);

  return suggestions;
}

// Debounce function to limit suggestions updates
function debounce<T extends (...args: unknown[]) => unknown>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default function Page() {
  const [result, setResult] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({
    email: '',
    interest: '',
    location: '',
    additionalInfo: ''
  })

  const formRef = useRef<HTMLDivElement>(null)
  const locationInputRef = useRef<HTMLInputElement>(null)
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const suggestions = useCitySuggestions(locationInputRef);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
    if (name === 'location') {
      setShowSuggestions(true);
    }
  }

  const handleSelectChange = (value: string) => {
    setFormData(prevState => ({
      ...prevState,
      interest: value
    }))
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("Sending....");

    const body = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      body.append(key, value);
    });

    body.append("access_key", "3065dced-e345-4d77-9413-d82ba37caec0");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      setFormData({
        email: '',
        interest: '',
        location: '',
        additionalInfo: ''
      });
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
      <div className="min-h-screen bg-green-100 flex flex-col">
        <header className="bg-green-900 text-white py-4 px-6 sticky top-0 z-50">
          <nav className="container mx-auto flex justify-between items-center">
            <a href="#" className="text-2xl font-bold">HolyPlant</a>
            <div className="space-x-4">
              <a href="#about" className="hover:text-green-200">About</a>
              <a href="#features" className="hover:text-green-200">Features</a>
              <a href="#contact" className="hover:text-green-200">Contact</a>
            </div>
          </nav>
        </header>

        <main className="flex-grow">
          <section className="relative bg-green-800 text-white">
            <div className="absolute inset-0 z-0">
              <Image
                  src="/images/monstera-leaves.jpg"
                  alt="Lush green Monstera leaves"
                  layout="fill"
                  objectFit="cover"
                  className="opacity-30"
              />
            </div>
            <div className="relative z-10 container mx-auto px-4 py-24 md:py-32">
              <div className="max-w-2xl">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to HolyPlant</h1>
                <p className="text-xl md:text-2xl mb-8">Your Trusted Plant Sitting Service</p>
                <Button className="bg-white text-green-800 hover:bg-green-100 text-lg py-3 px-8" onClick={scrollToForm}>
                  Join the Waitlist
                </Button>
              </div>
            </div>
            <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,96L48,90.7C96,85,192,75,288,74.7C384,75,480,85,576,90.7C672,96,768,96,864,90.7C960,85,1056,75,1152,69.3C1248,64,1344,64,1392,64L1440,64L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z" fill="#F0FDF4"/>
            </svg>
          </section>

          <section id="about" className="py-16 bg-green-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center text-green-900 mb-8">About HolyPlant</h2>
              <p className="text-lg text-center max-w-3xl mx-auto text-green-800">
                HolyPlant is an innovative platform connecting plant owners with passionate plant sitters.
                Whether you&apos;re going on vacation or need regular plant care assistance, our network of
                verified plant enthusiasts is here to ensure your green friends thrive. We&apos;re currently
                gearing up to launch our service and are excited to build a community of plant lovers!
              </p>
            </div>
          </section>

          <section id="features" className="py-16 bg-green-200">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center text-green-900 mb-12">Why Choose HolyPlant?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FeatureCard
                    icon={<LeafIcon className="w-12 h-12 text-green-700" />}
                    title="Expert Care"
                    description="Our sitters are passionate plant lovers with the knowledge to care for your green friends."
                />
                <FeatureCard
                    icon={<CalendarIcon className="w-12 h-12 text-green-700" />}
                    title="Flexible Scheduling"
                    description="Find sitters for short trips or long-term care, whenever you need them."
                />
                <FeatureCard
                    icon={<HeartIcon className="w-12 h-12 text-green-700" />}
                    title="Peace of Mind"
                    description="Rest easy knowing your plants are in good hands while you're away."
                />
              </div>
            </div>
          </section>

          <section id="contact" className="py-16 bg-green-50" ref={formRef}>
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center text-green-900 mb-8">Join Our Waitlist</h2>
              <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
                {result && (
                    <Alert className="mb-4">
                      <AlertDescription>{result}</AlertDescription>
                    </Alert>
                )}
                <form onSubmit={onSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-green-800">Email</label>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                        placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="interest" className="block text-sm font-medium text-green-800">I&apos;m interested in:</label>
                    <Select onValueChange={handleSelectChange} value={formData.interest}>
                      <SelectTrigger className="w-full mt-1">
                        <SelectValue placeholder="Select an option" className="text-gray-400" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="finding-sitter">Finding a plant sitter</SelectItem>
                        <SelectItem value="becoming-sitter">Becoming a plant sitter</SelectItem>
                        <SelectItem value="both">Both</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-green-800">Location</label>
                    <div className="relative">
                      <Input
                          type="text"
                          id="location"
                          name="location"
                          ref={locationInputRef}
                          value={formData.location}
                          onChange={handleInputChange}
                          onFocus={() => setShowSuggestions(true)}
                          required
                          className="mt-1"
                          placeholder="City, Country"
                      />
                      {showSuggestions && suggestions.length > 0 && (
                          <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto">
                            {suggestions.map((city, index) => (
                                <li
                                    key={index}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => {
                                      setFormData(prev => ({ ...prev, location: city }));
                                      if (locationInputRef.current) locationInputRef.current.value = city;
                                      setShowSuggestions(false);
                                    }}
                                >
                                  {city}
                                </li>
                            ))}
                          </ul>
                      )}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="additionalInfo" className="block text-sm font-medium text-green-800">Additional Information</label>
                    <Textarea
                        id="additionalInfo"
                        name="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="Tell us more about your plant sitting needs or experience"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-green-700 hover:bg-green-800 text-white">
                    <MailIcon className="w-4 h-4 mr-2" />
                    Join the Waitlist
                  </Button>
                </form>
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-green-900 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">HolyPlant</h3>
                <p>Connecting plant lovers since 2024</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><a href="#about" className="hover:text-green-200">About Us</a></li>
                  <li><a href="#features" className="hover:text-green-200">Features</a></li>
                  <li><a href="#contact" className="hover:text-green-200">Contact</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                <p>Email: contact@holyplant.net</p>
              </div>
            </div>
            <div className="mt-8 text-center">
              <p>&copy; 2024 HolyPlant. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <div className="flex justify-center mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2 text-green-800">{title}</h3>
        <p className="text-green-700">{description}</p>
      </div>
  )
}