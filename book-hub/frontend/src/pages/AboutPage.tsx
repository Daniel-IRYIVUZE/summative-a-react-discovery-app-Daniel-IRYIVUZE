import React from "react";
import { Users, Target, Heart, Award } from "lucide-react";

const AboutPage: React.FC = () => {
  const teamMembers = [
    {
      name: "Daniel Iryivuze",
      role: "Founder & CEO",
      image:
        "https://e7.pngegg.com/pngimages/134/822/png-clipart-computer-icons-business-man-people-logo-thumbnail.png",
      description:
        "Passionate about connecting readers with their next favorite book.",
    },
    {
      name: "Alain Muhirwa Michael",
      role: "Head of Technology",
      image:
        "https://e7.pngegg.com/pngimages/134/822/png-clipart-computer-icons-business-man-people-logo-thumbnail.png",
      description:
        "Building the future of book discovery through innovative technology.",
    },
    {
      name: "Sandra Ngoga",
      role: "Content Curator",
      image:
        "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/user-female-icon.png",
      description: "Expert in literature with a keen eye for hidden gems.",
    },
    {
      name: "Sonia Uwase",
      role: "Community Manager",
      image:
        "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/user-female-icon.png",
      description: "Fostering our vibrant community of book lovers.",
    },
  ];

  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To make book discovery effortless and enjoyable for every reader, while supporting authors and publishers.",
    },
    {
      icon: Heart,
      title: "Our Passion",
      description:
        "We believe in the transformative power of books and are committed to sharing that magic with the world.",
    },
    {
      icon: Users,
      title: "Our Community",
      description:
        "Building a global community where readers can connect, share, and discover together.",
    },
    {
      icon: Award,
      title: "Our Promise",
      description:
        "Delivering exceptional service, curated selections, and innovative features for all book enthusiasts.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About BookHub
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're on a mission to revolutionize how readers discover books and
              how authors connect with their audience. Founded in 2020, BookHub
              has grown into a vibrant community of book lovers worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  BookHub began as a simple idea: what if finding your next
                  favorite book could be as exciting as reading it? Our founder,
                  Sarah Johnson, noticed that while there were millions of books
                  available, discovering the right one felt overwhelming.
                </p>
                <p>
                  We started with a small team of book enthusiasts and tech
                  experts, determined to create a platform that combines
                  intelligent recommendations with human curation. Today, we
                  serve over 50,000 readers monthly and work with hundreds of
                  publishers and authors.
                </p>
                <p>
                  Our commitment remains the same: to create meaningful
                  connections between readers and books, while supporting the
                  literary community that makes it all possible.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <img
                src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500"
                alt="BookHub Team"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 text-gray-600 rounded-full mb-4">
                  <value.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600">
              The passionate people behind BookHub
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-gray-600 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">50K+</div>
              <div className="text-gray-100">Monthly Readers</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">10K+</div>
              <div className="text-gray-100">Books Available</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">100+</div>
              <div className="text-gray-100">Publishing Partners</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">25+</div>
              <div className="text-gray-100">Countries Served</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
