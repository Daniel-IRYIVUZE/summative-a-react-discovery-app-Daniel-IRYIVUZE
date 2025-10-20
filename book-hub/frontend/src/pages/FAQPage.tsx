import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Book,
  User,
  CreditCard,
  Truck,
} from "lucide-react";

const FAQPage: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };

  const faqCategories = [
    {
      icon: Book,
      title: "Books & Products",
      questions: [
        {
          question: "How do I search for specific books?",
          answer:
            "You can use the search bar at the top of any page to search by title, author, or ISBN. You can also use our advanced filters on the Store page to narrow down by genre, price range, rating, and more.",
        },
        {
          question: "Are all books on BookHub available for purchase?",
          answer:
            "Yes, all books displayed on our platform are available for purchase. We work directly with publishers and distributors to ensure availability.",
        },
        {
          question: "Do you offer e-books or audiobooks?",
          answer:
            "Currently, we specialize in physical books. However, we are exploring partnerships to include e-books and audiobooks in the future.",
        },
        {
          question: "How often is your book collection updated?",
          answer:
            "We update our collection weekly with new releases and regularly add older titles based on customer demand and recommendations.",
        },
      ],
    },
    {
      icon: User,
      title: "Account & Orders",
      questions: [
        {
          question: "How do I create an account?",
          answer:
            'Click on the "Register" button in the top navigation and fill out the registration form with your details. You can also sign up during the checkout process.',
        },
        {
          question: "I forgot my password. How can I reset it?",
          answer:
            'Click on "Login" and then "Forgot Password". Enter your email address and we will send you instructions to reset your password.',
        },
        {
          question: "How can I track my order?",
          answer:
            "Once your order ships, you will receive a tracking number via email. You can also view your order status in your account dashboard.",
        },
        {
          question: "Can I modify or cancel my order?",
          answer:
            "Orders can be modified or cancelled within 1 hour of placement. After that, the order enters processing and cannot be changed. Contact customer service for assistance.",
        },
      ],
    },
    {
      icon: CreditCard,
      title: "Payment & Pricing",
      questions: [
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for certain order amounts.",
        },
        {
          question: "Are there any hidden fees?",
          answer:
            "No, the price you see is the price you pay. We display all costs including taxes and shipping fees clearly before you complete your purchase.",
        },
        {
          question: "Do you offer discounts for bulk purchases?",
          answer:
            "Yes, we offer volume discounts for educational institutions, book clubs, and corporate purchases. Contact our sales team for custom pricing.",
        },
        {
          question: "Is my payment information secure?",
          answer:
            "Absolutely. We use industry-standard SSL encryption and never store your complete payment details on our servers.",
        },
      ],
    },
    {
      icon: Truck,
      title: "Shipping & Delivery",
      questions: [
        {
          question: "What are your shipping options and costs?",
          answer:
            "We offer standard shipping (5-7 business days) for $3.99, expedited shipping (2-3 business days) for $7.99, and free shipping on orders over $35.",
        },
        {
          question: "Do you ship internationally?",
          answer:
            "Currently, we ship to the United States, Canada, and select European countries. International shipping rates and delivery times vary by destination.",
        },
        {
          question: "How are books packaged for shipping?",
          answer:
            "All books are carefully packaged in protective materials to prevent damage during transit. We use reinforced cardboard boxes and bubble wrap for fragile editions.",
        },
        {
          question: "What if my book arrives damaged?",
          answer:
            "We apologize for any damage during shipping. Contact our customer service within 48 hours of delivery with photos of the damage, and we will send a replacement immediately.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find quick answers to common questions about BookHub. Can't find
            what you're looking for?{" "}
            <a href="/contact" className="text-gray-600 hover:text-gray-700">
              Contact us
            </a>
            .
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqCategories.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            return (
              <div
                key={categoryIndex}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                  <div className="flex items-center">
                    <IconComponent className="h-6 w-6 text-gray-600 mr-3" />
                    <h2 className="text-xl font-semibold text-gray-900">
                      {category.title}
                    </h2>
                  </div>
                </div>

                <div className="divide-y divide-gray-200">
                  {category.questions.map((item, itemIndex) => {
                    const fullIndex = categoryIndex * 10 + itemIndex;
                    const isOpen = openItems.includes(fullIndex);

                    return (
                      <div key={itemIndex} className="px-6 py-4">
                        <button
                          onClick={() => toggleItem(fullIndex)}
                          className="flex justify-between items-center w-full text-left focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-inset rounded-lg p-2 -m-2"
                        >
                          <span className="text-lg font-medium text-gray-900 pr-4">
                            {item.question}
                          </span>
                          {isOpen ? (
                            <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                          )}
                        </button>

                        {isOpen && (
                          <div className="mt-3 pl-2">
                            <p className="text-gray-600 leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Still Have Questions */}
        <div className="mt-12 bg-gray-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-gray-100 mb-6 max-w-2xl mx-auto">
            Our customer support team is here to help you with any other
            questions you might have.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-gray-600 bg-white hover:bg-gray-50"
            >
              Contact Support
            </a>
            <a
              href="mailto:danieliryivuze@gmail.com"
              className="inline-flex items-center px-6 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-gray-600 transition-colors"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
