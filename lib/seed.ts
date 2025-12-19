import { ID } from "react-native-appwrite";
import { config, databases } from "./appwrite";
import {
  agentImages,
  galleryImages,
  propertiesImages,
  reviewImages,
} from "./data";

const COLLECTIONS = {
  AGENT: config.agentsCollectionId,
  REVIEWS: config.reviewsCollectionId,
  GALLERY: config.galleriesCollectionId,
  PROPERTY: config.propertiesCollectionId,
};

const propertyTypes = [
  "House",
  "Townhouse",
  "Condo",
  "Duplex",
  "Studio",
  "Villa",
  "Apartment",
  "Other",
];

const facilities = [
  "Laundry",
  "Parking",
  "Sports-center",
  "Cutlery",
  "Gym",
  "Swimming-pool",
  "Wifi",
  "Pet-friendly",
];

/* =========================
   NAMES & CONTENT
========================= */

const agentNames = [
  "Adebayo Williams",
  "Chinedu Okafor",
  "Sarah Thompson",
  "Tunde Balogun",
  "Michael Johnson",
  "Funke Adeyemi",
  "Daniel Smith",
  "Ibrahim Musa",
];

const reviewerNames = [
  "Blessing Eze",
  "John Carter",
  "Oluwaseun Akinwale",
  "Emily Brown",
  "Sadiq Lawal",
  "Grace Okonkwo",
  "Peter Adams",
  "Halima Bello",
  "Samuel Johnson",
  "Ifunanya Nwoye",
  "David Miller",
  "Zainab Sule",
  "Andrew Collins",
  "Temitope Ogun",
  "Mary Olatunji",
  "Joseph Walker",
  "Aisha Mohammed",
  "Benjamin Stone",
  "Kehinde Ajayi",
  "Rebecca White",
];

const reviewComments = [
  "The property was exactly as described and very well maintained.",
  "Great location with easy access to major roads and amenities.",
  "The agent was professional and very responsive throughout.",
  "Spacious rooms and a calm environment. Highly recommended.",
  "I loved the facilities, especially the security and parking.",
  "Good value for money compared to similar properties nearby.",
  "The neighborhood felt safe and quiet, perfect for families.",
  "Smooth process from inspection to closing. No complaints.",
  "Beautiful design and excellent finishing.",
  "Would definitely consider buying or renting here again.",
];

/* =========================
   PROPERTIES & ADDRESSES
========================= */

const nigerianProperties = [
  "Eko Atlantic Skyline Apartments",
  "Banana Island Luxury Villas",
  "The Wheatbaker Residences",
  "Radisson Blu Anchorage Homes",
  "Ikoyi Crest Apartments",
  "Lekki Phase One Townhomes",
  "Civic Towers Victoria Island",
  "Pearl Gardens Lekki",
  "Emerald Court Ikate",
  "Parkview Estate Duplexes",
  "Jabi Lake View Apartments",
  "Asokoro Hillside Villas",
  "Maitama Grand Residences",
  "Central Park Towers Abuja",
  "Royal Palms Estate Ajah",
  "Osapa London Heights",
  "Victoria Crest Homes",
  "Bluewater Apartments Lekki",
  "Carlton Gate Estate",
  "Banex Plaza Residences",
];

const nigerianAddresses = [
  "Eko Atlantic City, Victoria Island, Lagos",
  "Banana Island, Ikoyi, Lagos",
  "Lawrence Road, Ikoyi, Lagos",
  "Ozumba Mbadiwe Avenue, Victoria Island, Lagos",
  "Alexander Road, Ikoyi, Lagos",
  "Lekki Phase 1, Lagos",
  "Ahmadu Bello Way, Victoria Island, Lagos",
  "Chevron Drive, Lekki, Lagos",
  "Ikate Elegushi, Lekki, Lagos",
  "Parkview Estate, Ikoyi, Lagos",
  "Jabi District, Abuja",
  "Asokoro District, Abuja",
  "Maitama District, Abuja",
  "Central Business District, Abuja",
  "Ajah, Lagos",
  "Osapa London, Lekki, Lagos",
  "Ikate, Lekki, Lagos",
  "Lekki Peninsula, Lagos",
  "Sangotedo, Lagos",
  "Wuse 2, Abuja",
];

/* =========================
   HELPERS
========================= */

function getRandomSubset<T>(array: T[], min: number, max: number): T[] {
  const size = Math.floor(Math.random() * (max - min + 1)) + min;
  return [...array].sort(() => 0.5 - Math.random()).slice(0, size);
}

function getRandomPrice() {
  // return Number((Math.random() * (600 - 15) + 15).toFixed(2));
  return Math.floor(Math.random() * (420 - 42 + 1)) + 42;
}

/* =========================
   SEED
========================= */

async function seed() {
  try {
    // Clear collections
    for (const key in COLLECTIONS) {
      const collectionId = COLLECTIONS[key as keyof typeof COLLECTIONS];
      const docs = await databases.listDocuments(
        config.databaseId!,
        collectionId!
      );
      for (const doc of docs.documents) {
        await databases.deleteDocument(
          config.databaseId!,
          collectionId!,
          doc.$id
        );
      }
    }

    console.log("Cleared all existing data.");

    // Agents
    const agents = [];
    for (let i = 0; i < 5; i++) {
      const agent = await databases.createDocument(
        config.databaseId!,
        COLLECTIONS.AGENT!,
        ID.unique(),
        {
          name: agentNames[i],
          email: `${agentNames[i]
            .toLowerCase()
            .replace(" ", ".")}@example.com`,
          avatar: agentImages[Math.floor(Math.random() * agentImages.length)],
        }
      );
      agents.push(agent);
    }
    console.log(`Seeded ${agents.length} agents.`);

    // Reviews
    const reviews = [];
    for (let i = 0; i < 20; i++) {
      const review = await databases.createDocument(
        config.databaseId!,
        COLLECTIONS.REVIEWS!,
        ID.unique(),
        {
          name: reviewerNames[i],
          avatar: reviewImages[Math.floor(Math.random() * reviewImages.length)],
          review:
            reviewComments[
            Math.floor(Math.random() * reviewComments.length)
            ],
          rating: Math.floor(Math.random() * 5) + 1,
        }
      );
      reviews.push(review);
    }
    console.log(`Seeded ${reviews.length} reviews.`);

    // Galleries
    const galleries = [];
    for (const image of galleryImages) {
      const gallery = await databases.createDocument(
        config.databaseId!,
        COLLECTIONS.GALLERY!,
        ID.unique(),
        { image }
      );
      galleries.push(gallery);
    }
    console.log(`Seeded ${galleries.length} galleries.`);

    // Properties
    for (let i = 0; i < 20; i++) {
      const property = await databases.createDocument(
        config.databaseId!,
        COLLECTIONS.PROPERTY!,
        ID.unique(),
        {
          name: nigerianProperties[i],
          type: propertyTypes[Math.floor(Math.random() * propertyTypes.length)],
          description: `A premium property located in ${nigerianAddresses[i]}.`,
          address: nigerianAddresses[i],
          geolocation: `6.${i + 2}345, 3.${i + 4}678`,
          price: getRandomPrice(),
          area: Math.floor(Math.random() * 3000) + 500,
          bedrooms: Math.floor(Math.random() * 5) + 1,
          bathrooms: Math.floor(Math.random() * 5) + 1,
          rating: Math.floor(Math.random() * 5) + 1,
          facilities: getRandomSubset(facilities, 2, facilities.length),
          image:
            propertiesImages[i] ??
            propertiesImages[
            Math.floor(Math.random() * propertiesImages.length)
            ],
          agent: agents[Math.floor(Math.random() * agents.length)].$id,
          reviews: getRandomSubset(reviews, 5, 7).map((r) => r.$id),
          gallery: getRandomSubset(galleries, 3, 8).map((g) => g.$id),
        }
      );

      console.log(`Seeded property: ${property.name}`);
    }

    console.log("Data seeding completed.");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
}

export default seed;













// ===========================================================================================





























// import { ID } from "react-native-appwrite";
// import { config, databases } from "./appwrite";
// import {
//   agentImages,
//   galleryImages,
//   propertiesImages,
//   reviewImages,
// } from "./data";

// const COLLECTIONS = {
//   AGENT: config.agentsCollectionId,
//   REVIEWS: config.reviewsCollectionId,
//   GALLERY: config.galleriesCollectionId,
//   PROPERTY: config.propertiesCollectionId,
// };

// const propertyTypes = [
//   "House",
//   "Townhouse",
//   "Condo",
//   "Duplex",
//   "Studio",
//   "Villa",
//   "Apartment",
//   "Other",
// ];

// const facilities = [
//   "Laundry",
//   "Parking",
//   "Sports-center",
//   "Cutlery",
//   "Gym",
//   "Swimming-pool",
//   "Wifi",
//   "Pet-friendly",
// ];

// function getRandomSubset<T>(
//   array: T[],
//   minItems: number,
//   maxItems: number
// ): T[] {
//   if (minItems > maxItems) {
//     throw new Error("minItems cannot be greater than maxItems");
//   }
//   if (minItems < 0 || maxItems > array.length) {
//     throw new Error(
//       "minItems or maxItems are out of valid range for the array"
//     );
//   }

//   // Generate a random size for the subset within the range [minItems, maxItems]
//   const subsetSize =
//     Math.floor(Math.random() * (maxItems - minItems + 1)) + minItems;

//   // Create a copy of the array to avoid modifying the original
//   const arrayCopy = [...array];

//   // Shuffle the array copy using Fisher-Yates algorithm
//   for (let i = arrayCopy.length - 1; i > 0; i--) {
//     const randomIndex = Math.floor(Math.random() * (i + 1));
//     [arrayCopy[i], arrayCopy[randomIndex]] = [
//       arrayCopy[randomIndex],
//       arrayCopy[i],
//     ];
//   }

//   // Return the first `subsetSize` elements of the shuffled array
//   return arrayCopy.slice(0, subsetSize);
// }

// async function seed() {
//   try {
//     // Clear existing data from all collections
//     for (const key in COLLECTIONS) {
//       const collectionId = COLLECTIONS[key as keyof typeof COLLECTIONS];
//       const documents = await databases.listDocuments(
//         config.databaseId!,
//         collectionId!
//       );
//       for (const doc of documents.documents) {
//         await databases.deleteDocument(
//           config.databaseId!,
//           collectionId!,
//           doc.$id
//         );
//       }
//     }

//     console.log("Cleared all existing data.");

//     // Seed Agents
//     const agents = [];
//     for (let i = 1; i <= 5; i++) {
//       const agent = await databases.createDocument(
//         config.databaseId!,
//         COLLECTIONS.AGENT!,
//         ID.unique(),
//         {
//           name: `Agent ${i}`,
//           email: `agent${i}@example.com`,
//           avatar: agentImages[Math.floor(Math.random() * agentImages.length)],
//         }
//       );
//       agents.push(agent);
//     }
//     console.log(`Seeded ${agents.length} agents.`);

//     // Seed Reviews
//     const reviews = [];
//     for (let i = 1; i <= 20; i++) {
//       const review = await databases.createDocument(
//         config.databaseId!,
//         COLLECTIONS.REVIEWS!,
//         ID.unique(),
//         {
//           name: `Reviewer ${i}`,
//           avatar: reviewImages[Math.floor(Math.random() * reviewImages.length)],
//           review: `This is a review by Reviewer ${i}.`,
//           rating: Math.floor(Math.random() * 5) + 1, // Rating between 1 and 5
//         }
//       );
//       reviews.push(review);
//     }
//     console.log(`Seeded ${reviews.length} reviews.`);

//     // Seed Galleries
//     const galleries = [];
//     for (const image of galleryImages) {
//       const gallery = await databases.createDocument(
//         config.databaseId!,
//         COLLECTIONS.GALLERY!,
//         ID.unique(),
//         { image }
//       );
//       galleries.push(gallery);
//     }

//     console.log(`Seeded ${galleries.length} galleries.`);

//     // Seed Properties
//     for (let i = 1; i <= 20; i++) {
//       const assignedAgent = agents[Math.floor(Math.random() * agents.length)];

//       const assignedReviews = getRandomSubset(reviews, 5, 7); // 5 to 7 reviews
//       const assignedGalleries = getRandomSubset(galleries, 3, 8); // 3 to 8 galleries

//       const selectedFacilities = facilities
//         .sort(() => 0.5 - Math.random())
//         .slice(0, Math.floor(Math.random() * facilities.length) + 1);

//       const image =
//         propertiesImages.length - 1 >= i
//           ? propertiesImages[i]
//           : propertiesImages[
//               Math.floor(Math.random() * propertiesImages.length)
//             ];

//       const property = await databases.createDocument(
//         config.databaseId!,
//         COLLECTIONS.PROPERTY!,
//         ID.unique(),
//         {
//           name: `Property ${i}`,
//           type: propertyTypes[Math.floor(Math.random() * propertyTypes.length)],
//           description: `This is the description for Property ${i}.`,
//           address: `123 Property Street, City ${i}`,
//           geolocation: `192.168.1.${i}, 192.168.1.${i}`,
//           price: Math.floor(Math.random() * 9000) + 1000,
//           area: Math.floor(Math.random() * 3000) + 500,
//           bedrooms: Math.floor(Math.random() * 5) + 1,
//           bathrooms: Math.floor(Math.random() * 5) + 1,
//           rating: Math.floor(Math.random() * 5) + 1,
//           facilities: selectedFacilities,
//           image: image,
//           agent: assignedAgent.$id,
//           reviews: assignedReviews.map((review) => review.$id),
//           gallery: assignedGalleries.map((gallery) => gallery.$id),
//         }
//       );

//       console.log(`Seeded property: ${property.name}`);
//     }

//     console.log("Data seeding completed.");
//   } catch (error) {
//     console.error("Error seeding data:", error);
//   }
// }

// export default seed;
