import { PrismaClient, BookingStatus, PaymentMethod, PaymentStatus, ServiceType, BuildingType, TimeSlot, QuoteStatus, UserRole } from "@prisma/client";
import { addDays, subDays, format } from "date-fns";

const prisma = new PrismaClient();

const SERVICES = [
  { name: "Fine Art Transport", type: ServiceType.FINE_ART, description: "Museum-grade transport for paintings, sculptures, and fine art pieces with climate-controlled vehicles.", basePrice: 450, icon: "palette", sortOrder: 1 },
  { name: "Luxury Furniture", type: ServiceType.LUXURY_FURNITURE, description: "White-glove moving service for high-end furniture, antiques, and designer pieces.", basePrice: 350, icon: "sofa", sortOrder: 2 },
  { name: "Museum Delivery", type: ServiceType.MUSEUM_DELIVERY, description: "Specialized logistics for museums, galleries, and cultural institutions.", basePrice: 800, icon: "building2", sortOrder: 3 },
  { name: "White Glove Delivery", type: ServiceType.WHITE_GLOVE, description: "Premium end-to-end delivery with full setup and placement service.", basePrice: 300, icon: "star", sortOrder: 4 },
  { name: "Professional Packing", type: ServiceType.PACKING, description: "Expert packing using archival materials, custom crating, and protective wrapping.", basePrice: 150, icon: "package", sortOrder: 5 },
  { name: "Installation Service", type: ServiceType.INSTALLATION, description: "Professional installation of artwork, mirrors, shelving, and furniture.", basePrice: 200, icon: "hammer", sortOrder: 6 },
  { name: "Climate Storage", type: ServiceType.STORAGE, description: "Secure, climate-controlled storage for fine art and luxury items.", basePrice: 250, icon: "warehouse", sortOrder: 7 },
];

const PRICING_RULES = [
  { name: "Base Price", ruleKey: "base_price", value: 0, unit: "included", description: "Included in service base price" },
  { name: "Distance Fee (per mile)", ruleKey: "distance_per_mile", value: 2.5, unit: "per_mile", description: "Charged per mile over 10 miles" },
  { name: "Large Item Fee", ruleKey: "large_item_fee", value: 75, unit: "flat", description: "Items over 60 inches in any dimension" },
  { name: "Heavy Item Fee", ruleKey: "heavy_item_fee", value: 100, unit: "flat", description: "Items over 150 lbs" },
  { name: "Fragile Item Fee", ruleKey: "fragile_fee", value: 50, unit: "flat", description: "Extra care for fragile items" },
  { name: "Glass Protection Fee", ruleKey: "glass_fee", value: 40, unit: "flat", description: "Special handling for glass items" },
  { name: "Packing Fee", ruleKey: "packing_fee", value: 80, unit: "flat", description: "Professional packing service" },
  { name: "Unpacking Fee", ruleKey: "unpacking_fee", value: 60, unit: "flat", description: "Professional unpacking service" },
  { name: "Installation Fee", ruleKey: "installation_fee", value: 120, unit: "flat", description: "Professional installation" },
  { name: "Disassembly Fee", ruleKey: "disassembly_fee", value: 90, unit: "flat", description: "Furniture disassembly" },
  { name: "Assembly Fee", ruleKey: "assembly_fee", value: 90, unit: "flat", description: "Furniture assembly" },
  { name: "Weekend Surcharge", ruleKey: "weekend_fee", value: 75, unit: "flat", description: "Saturday and Sunday bookings" },
  { name: "Holiday Surcharge", ruleKey: "holiday_fee", value: 150, unit: "flat", description: "Federal holiday bookings" },
  { name: "Insurance Fee", ruleKey: "insurance_fee", value: 1.5, unit: "percent", description: "1.5% of declared item value" },
  { name: "Second Floor Fee", ruleKey: "second_floor_fee", value: 50, unit: "flat", description: "Delivery to second floor without elevator" },
  { name: "Third Floor+ Fee", ruleKey: "third_floor_fee", value: 100, unit: "flat", description: "Delivery to third floor or higher without elevator" },
  { name: "No Elevator Fee", ruleKey: "no_elevator_fee", value: 75, unit: "flat", description: "Buildings without elevator access" },
  { name: "Emergency Booking Fee", ruleKey: "emergency_fee", value: 200, unit: "flat", description: "Same-day or next-day bookings" },
  { name: "Crating Fee", ruleKey: "crating_fee", value: 180, unit: "flat", description: "Custom wooden crating for high-value items" },
  { name: "Climate Control Fee", ruleKey: "climate_fee", value: 95, unit: "flat", description: "Climate-controlled vehicle requirement" },
  { name: "Long Distance Fee", ruleKey: "long_distance_fee", value: 0.85, unit: "per_mile", description: "Additional fee for trips over 100 miles" },
  { name: "Stair Carry Fee (per flight)", ruleKey: "stair_fee", value: 35, unit: "per_flight", description: "Per flight of stairs" },
  { name: "Waiting Time Fee (per hour)", ruleKey: "waiting_fee", value: 85, unit: "per_hour", description: "Waiting time beyond 30 minutes" },
  { name: "Fuel Surcharge", ruleKey: "fuel_surcharge", value: 25, unit: "flat", description: "Current fuel surcharge" },
  { name: "Minimum Booking Fee", ruleKey: "minimum_fee", value: 250, unit: "minimum", description: "Minimum booking amount" },
];

const FIRST_NAMES = ["James", "Emma", "Oliver", "Sophia", "William", "Isabella", "Benjamin", "Mia", "Lucas", "Charlotte", "Henry", "Amelia", "Alexander", "Harper", "Mason", "Evelyn", "Ethan", "Abigail", "Daniel", "Emily", "Michael", "Elizabeth", "Matthew", "Sofia", "Jackson", "Avery", "Sebastian", "Ella", "Aiden", "Scarlett", "Joseph", "Grace", "Samuel", "Chloe", "David", "Victoria", "Carter", "Riley", "Wyatt", "Aria"];
const LAST_NAMES = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores"];
const CITIES = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville", "Fort Worth", "Columbus", "Charlotte", "Indianapolis", "San Francisco", "Seattle", "Denver", "Nashville"];
const STATES = ["NY", "CA", "IL", "TX", "AZ", "PA", "TX", "CA", "TX", "CA", "TX", "FL", "TX", "OH", "NC", "IN", "CA", "WA", "CO", "TN"];
const STREETS = ["Oak Street", "Maple Avenue", "Park Boulevard", "Main Street", "Cedar Lane", "Elm Drive", "Pine Road", "Willow Way", "Sunset Boulevard", "Highland Avenue", "Riverside Drive", "Lake Shore Drive", "Museum Mile", "Gallery Row", "Art District Way"];
const ITEM_CATEGORIES = ["Painting", "Sculpture", "Photography", "Print", "Drawing", "Tapestry", "Antique Furniture", "Mirror", "Chandelier", "Vase", "Bronze", "Marble Statue"];
const ITEM_TITLES = ["Abstract Composition No. 7", "Coastal Serenity", "Portrait of Elegance", "The Golden Hour", "Midnight Garden", "Urban Landscape", "Classical Study", "Modern Harmony", "Vintage Armoire", "Art Deco Mirror", "Bronze Equestrian", "Marble Torso", "Impressionist Landscape", "Contemporary Still Life", "Baroque Portrait"];

function rand<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
function randInt(min: number, max: number): number { return Math.floor(Math.random() * (max - min + 1)) + min; }
function randFloat(min: number, max: number): number { return Math.round((Math.random() * (max - min) + min) * 100) / 100; }
function randBool(prob = 0.5): boolean { return Math.random() < prob; }

async function main() {
  console.log("🌱 Seeding FineMove Pro database...");

  await prisma.analytics.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.bookingItem.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.quote.deleteMany();
  await prisma.calendarSlot.deleteMany();
  await prisma.pricingRule.deleteMany();
  await prisma.service.deleteMany();
  await prisma.staff.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.user.deleteMany();
  await prisma.settings.deleteMany();

  // Services
  const services = await Promise.all(SERVICES.map(s => prisma.service.create({ data: s })));
  console.log(`✅ Created ${services.length} services`);

  // Pricing Rules
  await prisma.pricingRule.createMany({ data: PRICING_RULES });
  console.log(`✅ Created ${PRICING_RULES.length} pricing rules`);

  // Admin user
  const adminUser = await prisma.user.create({
    data: {
      email: "admin@finemovepro.com",
      name: "Alexandra Sterling",
      phone: "+1 (212) 555-0100",
      role: UserRole.ADMIN,
      staff: {
        create: { title: "Operations Director", department: "Management", active: true }
      }
    }
  });

  // Staff users
  const staffData = [
    { name: "Marcus Chen", email: "marcus@finemovepro.com", title: "Senior Art Handler", department: "Operations" },
    { name: "Sofia Reyes", email: "sofia@finemovepro.com", title: "Logistics Coordinator", department: "Logistics" },
    { name: "James Whitfield", email: "james@finemovepro.com", title: "Installation Specialist", department: "Installation" },
  ];
  const staffUsers = await Promise.all(staffData.map(s =>
    prisma.user.create({
      data: {
        email: s.email, name: s.name, role: UserRole.STAFF,
        staff: { create: { title: s.title, department: s.department, active: true } }
      },
      include: { staff: true }
    })
  ));
  console.log(`✅ Created ${staffUsers.length + 1} staff/admin users`);

  // Customers (300)
  const customers: { id: string }[] = [];
  for (let i = 0; i < 300; i++) {
    const firstName = rand(FIRST_NAMES);
    const lastName = rand(LAST_NAMES);
    const cityIdx = randInt(0, CITIES.length - 1);
    const user = await prisma.user.create({
      data: {
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@example.com`,
        name: `${firstName} ${lastName}`,
        phone: `+1 (${randInt(200, 999)}) ${randInt(200, 999)}-${randInt(1000, 9999)}`,
        role: UserRole.CUSTOMER,
        customer: {
          create: {
            company: randBool(0.3) ? `${lastName} ${rand(["Gallery", "Collection", "Foundation", "Museum", "Art Group"])}` : null,
            address: `${randInt(100, 9999)} ${rand(STREETS)}`,
            city: CITIES[cityIdx],
            state: STATES[cityIdx],
            zip: `${randInt(10000, 99999)}`,
          }
        }
      },
      include: { customer: true }
    });
    customers.push({ id: user.customer!.id });
  }
  console.log(`✅ Created 300 customers`);

  // Bookings (100)
  const statuses = [BookingStatus.PENDING, BookingStatus.CONFIRMED, BookingStatus.IN_PROGRESS, BookingStatus.COMPLETED, BookingStatus.CANCELLED];
  const statusWeights = [0.15, 0.25, 0.1, 0.4, 0.1];
  const staffIds = staffUsers.map(s => s.staff!.id);

  const bookings: { id: string; customerId: string; totalPrice: number; scheduledDate: Date; status: BookingStatus }[] = [];

  for (let i = 0; i < 100; i++) {
    const customer = rand(customers);
    const service = rand(services);
    const cityIdx = randInt(0, CITIES.length - 1);
    const destCityIdx = randInt(0, CITIES.length - 1);
    const daysOffset = randInt(-90, 60);
    const scheduledDate = addDays(new Date(), daysOffset);
    const basePrice = service.basePrice;
    const addOns = randFloat(0, 300);
    const distance = randFloat(0, 150);
    const distanceFee = distance * 2.5;
    const totalPrice = Math.max(250, basePrice + addOns + distanceFee);

    let statusRoll = Math.random();
    let cumulative = 0;
    let status: BookingStatus = BookingStatus.PENDING;
    for (let j = 0; j < statuses.length; j++) {
      cumulative += statusWeights[j];
      if (statusRoll <= cumulative) { status = statuses[j] as BookingStatus; break; }
    }

    const booking = await prisma.booking.create({
      data: {
        bookingNumber: `FMP-${String(1000 + i).padStart(5, "0")}`,
        customerId: customer.id,
        serviceId: service.id,
        status,
        paymentMethod: rand([PaymentMethod.STRIPE, PaymentMethod.PAY_LATER, PaymentMethod.BANK_TRANSFER, PaymentMethod.QUOTE_REQUEST]),
        paymentStatus: status === BookingStatus.COMPLETED ? PaymentStatus.PAID : status === BookingStatus.CANCELLED ? PaymentStatus.REFUNDED : PaymentStatus.UNPAID,
        pickupAddress: `${randInt(100, 9999)} ${rand(STREETS)}`,
        pickupCity: CITIES[cityIdx],
        pickupState: STATES[cityIdx],
        pickupZip: `${randInt(10000, 99999)}`,
        pickupBuilding: rand([BuildingType.HOUSE, BuildingType.APARTMENT, BuildingType.OFFICE, BuildingType.GALLERY]),
        pickupFloor: randInt(1, 5),
        pickupElevator: randBool(0.6),
        pickupDock: randBool(0.2),
        destAddress: `${randInt(100, 9999)} ${rand(STREETS)}`,
        destCity: CITIES[destCityIdx],
        destState: STATES[destCityIdx],
        destZip: `${randInt(10000, 99999)}`,
        destBuilding: rand([BuildingType.HOUSE, BuildingType.APARTMENT, BuildingType.MUSEUM, BuildingType.GALLERY]),
        destFloor: randInt(1, 4),
        destElevator: randBool(0.6),
        destDock: randBool(0.2),
        scheduledDate,
        timeSlot: rand([TimeSlot.MORNING, TimeSlot.AFTERNOON, TimeSlot.EVENING]),
        estimatedHours: randFloat(2, 8),
        basePrice,
        distanceFee,
        addOnFees: addOns,
        discount: randBool(0.15) ? randFloat(25, 100) : 0,
        totalPrice,
        staffId: randBool(0.7) ? rand(staffIds) : null,
        notes: randBool(0.3) ? "Please handle with extreme care. Museum-quality piece." : null,
        items: {
          create: [{
            category: rand(ITEM_CATEGORIES),
            title: rand(ITEM_TITLES),
            description: "Professionally appraised piece requiring careful handling.",
            width: randFloat(12, 72),
            height: randFloat(12, 84),
            length: randFloat(2, 24),
            weight: randFloat(5, 200),
            quantity: randInt(1, 3),
            hasFrame: randBool(0.6),
            hasGlass: randBool(0.4),
            isFragile: randBool(0.7),
            needsInsurance: randBool(0.5),
            needsPacking: randBool(0.5),
            needsInstall: randBool(0.3),
            insuranceValue: randBool(0.5) ? randFloat(1000, 50000) : null,
          }]
        }
      }
    });
    bookings.push({ id: booking.id, customerId: customer.id, totalPrice, scheduledDate, status });
  }
  console.log(`✅ Created 100 bookings`);

  // Invoices for completed bookings
  let invoiceCount = 0;
  for (const b of bookings.filter(b => b.status === BookingStatus.COMPLETED || b.status === BookingStatus.CONFIRMED)) {
    const tax = b.totalPrice * 0.08;
    await prisma.invoice.create({
      data: {
        invoiceNumber: `INV-${String(2000 + invoiceCount).padStart(5, "0")}`,
        bookingId: b.id,
        customerId: b.customerId,
        amount: b.totalPrice,
        tax,
        total: b.totalPrice + tax,
        status: b.status === BookingStatus.COMPLETED ? PaymentStatus.PAID : PaymentStatus.UNPAID,
        dueDate: addDays(b.scheduledDate, 30),
        paidAt: b.status === BookingStatus.COMPLETED ? addDays(b.scheduledDate, randInt(1, 15)) : null,
      }
    });
    invoiceCount++;
  }
  console.log(`✅ Created ${invoiceCount} invoices`);

  // Quotes (50)
  const quoteStatuses = [QuoteStatus.PENDING, QuoteStatus.APPROVED, QuoteStatus.REJECTED, QuoteStatus.EXPIRED];
  for (let i = 0; i < 50; i++) {
    const customer = rand(customers);
    await prisma.quote.create({
      data: {
        quoteNumber: `QT-${String(3000 + i).padStart(5, "0")}`,
        customerId: customer.id,
        status: rand(quoteStatuses),
        serviceType: rand(["Fine Art", "Luxury Furniture", "Museum Delivery", "White Glove", "Storage"]),
        description: rand(["48x60 oil painting transport from gallery to private residence", "Antique armoire relocation, requires disassembly", "Bronze sculpture installation at corporate headquarters", "Collection of 12 framed prints, packing and delivery", "Grand piano relocation with full white-glove service"]),
        estimatedPrice: randFloat(300, 5000),
        validUntil: addDays(new Date(), randInt(-30, 60)),
        notes: randBool(0.4) ? "Client requested expedited service." : null,
      }
    });
  }
  console.log(`✅ Created 50 quotes`);

  // Calendar Slots (30 days)
  for (let d = 0; d < 30; d++) {
    const date = addDays(new Date(), d);
    for (const slot of [TimeSlot.MORNING, TimeSlot.AFTERNOON, TimeSlot.EVENING]) {
      const booked = randInt(0, 3);
      await prisma.calendarSlot.create({
        data: {
          date,
          timeSlot: slot,
          capacity: 3,
          booked,
          available: booked < 3,
        }
      });
    }
  }
  console.log(`✅ Created 90 calendar slots`);

  // Analytics (90 days)
  for (let d = 89; d >= 0; d--) {
    const date = subDays(new Date(), d);
    const dayBookings = randInt(0, 5);
    const revenue = dayBookings * randFloat(300, 1200);
    await prisma.analytics.create({
      data: {
        date,
        revenue,
        bookings: dayBookings,
        newCustomers: randInt(0, 4),
        completedJobs: randInt(0, dayBookings),
        avgBookingValue: dayBookings > 0 ? revenue / dayBookings : 0,
      }
    });
  }
  console.log(`✅ Created 90 days of analytics`);

  // Notifications
  const allCustomerUsers = await prisma.user.findMany({ where: { role: UserRole.CUSTOMER }, take: 20 });
  for (const user of allCustomerUsers) {
    await prisma.notification.createMany({
      data: [
        { userId: user.id, title: "Booking Confirmed", message: "Your booking FMP-01001 has been confirmed.", type: "success", read: randBool(0.5) },
        { userId: user.id, title: "Crew Assigned", message: "Your dedicated crew has been assigned to your booking.", type: "info", read: randBool(0.3) },
      ]
    });
  }
  console.log(`✅ Created notifications`);

  // Settings
  await prisma.settings.createMany({
    data: [
      { key: "company_name", value: "FineMove Pro", description: "Company display name" },
      { key: "company_email", value: "hello@finemovepro.com", description: "Primary contact email" },
      { key: "company_phone", value: "+1 (212) 555-0199", description: "Primary phone number" },
      { key: "company_address", value: "350 Fifth Avenue, New York, NY 10118", description: "Company address" },
      { key: "tax_rate", value: "0.08", description: "Sales tax rate" },
      { key: "currency", value: "USD", description: "Default currency" },
      { key: "booking_lead_time", value: "24", description: "Minimum hours before booking" },
      { key: "max_daily_bookings", value: "9", description: "Maximum bookings per day" },
    ]
  });
  console.log(`✅ Created settings`);

  console.log("\n🎉 Seeding complete! FineMove Pro is ready.");
  console.log(`\n📧 Admin login: admin@finemovepro.com`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
