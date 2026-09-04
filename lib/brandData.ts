export interface BrandFaq {
  q: string;
  a: string;
}

export interface BrandService {
  name: string;
  description: string;
  iconType: 'washing-machine' | 'refrigerator' | 'ac' | 'microwave' | 'tv';
}

export interface BrandProblem {
  title: string;
  description: string;
}

export interface BrandGalleryItem {
  src: string;
  alt: string;
  title: string;
  category: string;
}

export interface BrandHeroImage {
  src: string;
  alt: string;
  tagline: string;
}

export interface BrandData {
  slug: string;
  name: string;
  title: string;
  tagline: string;
  heroImage: string;
  heroImages: BrandHeroImage[];
  description: string;
  overviewParagraphs: string[];
  supportedModels: string[];
  seoTitle: string;
  seoDescription: string;
  services: BrandService[];
  commonProblems: BrandProblem[];
  faqs: BrandFaq[];
  gallery: BrandGalleryItem[];
}

export const brands: BrandData[] = [
  {
    slug: 'lg',
    name: 'LG',
    title: 'LG Appliance Repair & Service Support in India',
    tagline: 'Specialized Doorstep Diagnostics for LG Smart Inverter & AI DirectDrive Appliances',
    heroImage: 'https://ik.imagekit.io/b2gtgefhu/1f7bd1ad-f87d-45d4-b6fc-eeb6619bb504.png',
    heroImages: [
      { src: 'https://ik.imagekit.io/b2gtgefhu/1f7bd1ad-f87d-45d4-b6fc-eeb6619bb504.png', alt: 'LG appliance service and technician support in India', tagline: 'Certified LG Repair & Diagnostics' }
    ],
    description: 'Independent out-of-warranty repair service for LG refrigerators, washing machines, inverter air conditioners, microwave ovens, and Smart TVs across India.',
    overviewParagraphs: [
      'LG home appliances are celebrated for their cutting-edge engineering, featuring patented technologies like AI Direct Drive (AI DD™) motors, Smart Inverter compressors, and ThinQ smart diagnostics. When your LG appliance encounters operational faults, precision troubleshooting is vital to safeguard these complex digital circuits.',
      'Our team of certified appliance technicians brings deep expertise in diagnosing inverter PCB boards, linear compressors, magnetrons, and display panels. We provide transparent, doorstep diagnostic assessments across Delhi, Noida, Gurugram, Ghaziabad, and Faridabad within 30 minutes of booking.',
      'Whether your LG front-load washer is displaying an OE error code, your Dual Inverter AC requires refrigerant top-up, or your Door-in-Door refrigerator has cooling loss, we restore your appliance to peak operating efficiency using genuine-grade replacement components backed by a 30-day service warranty.'
    ],
    supportedModels: [
      'LG AI DirectDrive Front Load Washers',
      'LG Smart Inverter Top Load Washers',
      'LG Door-in-Door & Side-by-Side Refrigerators',
      'LG Dual Inverter Split & Window ACs',
      'LG Charcoal Convection Microwave Ovens',
      'LG OLED, NanoCell & 4K UHD Smart TVs'
    ],
    seoTitle: 'LG Appliance Repair & Service in India | Customer Care',
    seoDescription: 'Expert LG appliance repair service across Delhi, Noida, Gurugram & Faridabad. Doorstep repair for LG Washing Machines, Fridges, ACs & TVs. Book your visit!',
    services: [
      { name: 'LG Washing Machine Repair', description: 'Expert diagnosis for AI DirectDrive front-loaders, top-loaders, water drainage faults, drum noise, and motor PCB errors.', iconType: 'washing-machine' },
      { name: 'LG Refrigerator Service', description: 'Comprehensive repair for Smart Inverter & Linear compressors, gas charging, defrost sensor replacements, and cooling restoration.', iconType: 'refrigerator' },
      { name: 'LG Dual Inverter AC Service', description: 'Specialized PCB repairs, outdoor fan motor replacement, copper pipe leak brazing, and eco-friendly gas refilling.', iconType: 'ac' },
      { name: 'LG Microwave Oven Repair', description: 'Precision repair for magnetron heating elements, touch membrane keypads, high-voltage diodes, and turntable motors.', iconType: 'microwave' },
      { name: 'LG OLED & Smart TV Repair', description: 'Motherboard circuit repair, panel backlight replacement, power supply unit fixes, and audio troubleshooting.', iconType: 'tv' }
    ],
    commonProblems: [
      { title: 'OE / IE Drainage & Inlet Error Codes', description: 'Fixing clogged drain pumps, faulty pressure sensors, and water inlet valve blockages on LG washing machines.' },
      { title: 'Cooling Loss in Inverter Refrigerators', description: 'Diagnosing linear compressor relay malfunctions, inverter board failures, and sealed system refrigerant leaks.' },
      { title: 'CH05 / CH10 Inverter AC Communication Faults', description: 'Resolving signal communication errors between indoor and outdoor inverter PCB modules.' },
      { title: 'Microwave Running But Not Heating', description: 'Testing and replacing burnt high-voltage capacitors, transformers, or defective magnetron tubes.' }
    ],
    faqs: [
      { q: 'Do you repair LG Smart Inverter and AI DirectDrive appliances?', a: 'Yes. Our senior technicians specialize in LG digital inverter electronics, brushless direct-drive motors, and micro-controller PCB boards.' },
      { q: 'What is your response time for doorstep LG appliance repair?', a: 'We provide prompt doorstep assistance with verified technicians dispatched to your location across India within 30 to 60 minutes.' },
      { q: 'Are replacement parts covered under warranty?', a: 'Yes. All replaced parts and repair labor are protected under our comprehensive 30-day doorstep service warranty.' },
      { q: 'Are you an official LG authorized service center?', a: 'No. We are an independent, third-party repair provider specializing exclusively in affordable out-of-warranty appliances.' }
    ],
    gallery: [
      { src: 'https://ik.imagekit.io/b2gtgefhu/8c724907-0b31-49f8-835c-7f8494672f9c.png', alt: 'LG Washing Machine Models - Front Load, Top Load, and Semi-Automatic repair and service in India', title: 'LG Washing Machine Lineup & Diagnostics', category: 'Washing Machine' },
      { src: 'https://ik.imagekit.io/b2gtgefhu/481c2387-b4a1-4ba3-a6a9-73e3ed0bc155.png', alt: 'LG Single Door & Double Door Frost-Free Smart Inverter Refrigerator Repair and Service in India', title: 'LG Refrigerator Lineup & Cooling Service', category: 'Refrigerator' },
      { src: 'https://ik.imagekit.io/b2gtgefhu/ba9bf70c-4e64-44b7-ac92-1ce68e2ad822.png', alt: 'LG Dual Inverter & Smart Inverter Split AC Installation, Repair and Gas Charging in India', title: 'LG Dual Inverter AC Servicing', category: 'Air Conditioner' },
      { src: 'https://ik.imagekit.io/b2gtgefhu/a7fcca58-5b6a-410b-a13b-17a356cb713b.png', alt: 'LG Charcoal Convection, Grill & Solo Microwave Oven Repair and Magnetron Service in India', title: 'LG Convection Microwave Diagnostics', category: 'Microwave' },
      { src: 'https://ik.imagekit.io/b2gtgefhu/2f469b73-0b0c-4f47-a807-2248ed0b7f72.png', alt: 'LG LED, LCD, OLED & 4K Smart TV repair and panel service in India', title: 'LG Smart TV & Display Diagnostics', category: 'Television' },
      { src: '/images/brands/lg/lg-gallery-6.webp', alt: 'Satisfied Indian customer receiving digital service invoice after LG appliance repair', title: 'Doorstep Customer Satisfaction', category: 'Service Guarantee' }
    ]
  },
  {
    slug: 'samsung',
    name: 'Samsung',
    title: 'Samsung Appliance Repair & Service Support in India',
    tagline: 'Expert Independent Technicians for Samsung Digital Inverter & EcoBubble Technology',
    heroImage: 'https://ik.imagekit.io/b2gtgefhu/c125bf56-90bb-40a9-b9e4-aaf98f457490.png',
    heroImages: [
      { src: 'https://ik.imagekit.io/b2gtgefhu/c125bf56-90bb-40a9-b9e4-aaf98f457490.png', alt: 'Samsung Appliance Repair & Complete Service Support in India', tagline: 'Certified Samsung Support' }
    ],
    description: 'Fast doorstep repair and maintenance for Samsung refrigerators, EcoBubble washing machines, WindFree ACs, microwaves, and Smart TVs in India.',
    overviewParagraphs: [
      'Samsung appliances integrate sophisticated electronic control systems, including Digital Inverter compressors with variable-speed operation, EcoBubble™ wash generators, and SpaceMax™ high-efficiency thermal insulation. Proper maintenance requires specialized digital multimeters and manufacturer-compatible diagnostic routines.',
      'Our seasoned technicians have extensive practical field experience resolving complex Samsung motherboard faults, BLDC motor breakdowns, sensor calibration errors, and cooling system leaks across residential households in India.',
      'We arrive with fully equipped mobile toolkits to inspect your appliance on-site, provide an honest, upfront written estimate, and complete repairs the same day so your family experiences zero downtime.'
    ],
    supportedModels: [
      'Samsung EcoBubble & QuickDrive Front Loaders',
      'Samsung Wobble Technology Top Load Washers',
      'Samsung SpaceMax & Curd Maestro Refrigerators',
      'Samsung WindFree & Convertible 5-in-1 ACs',
      'Samsung Slim Fry & Ceramic Enamel Microwaves',
      'Samsung QLED, Crystal 4K & The Frame Smart TVs'
    ],
    seoTitle: 'Samsung Appliance Repair in India | Customer Care',
    seoDescription: 'Trusted Samsung appliance repair in Delhi, Noida, Gurgaon & Faridabad. Same-day doorstep service for Samsung Washing Machines, Fridges, ACs & TVs. Book now!',
    services: [
      { name: 'Samsung Washing Machine Repair', description: 'Expert solutions for 4E, 5E, and dE errors, EcoBubble pump replacement, spin cycle vibration, and control board repairs.', iconType: 'washing-machine' },
      { name: 'Samsung Refrigerator Service', description: 'Precision diagnostics for Digital Inverter compressors, twin cooling evaporator fans, and defrost heating coils.', iconType: 'refrigerator' },
      { name: 'Samsung WindFree AC Repair', description: 'Full PCB troubleshooting, motor replacements, coil brazing, vacuumization, and R32/R410A gas refilling.', iconType: 'ac' },
      { name: 'Samsung Microwave Repair', description: 'Fixing spark issues, ceramic cavity heating failure, membrane touchpad unresponsive faults, and door interlocks.', iconType: 'microwave' },
      { name: 'Samsung QLED & Smart TV Repair', description: 'Repairing no-display screens, backlight LED strips, T-Con timing boards, and audio IC circuits.', iconType: 'tv' }
    ],
    commonProblems: [
      { title: '4C / 5C Water Feed & Drainage Issues', description: 'Clearing debris from drain filter assemblies and repairing faulty water inlet solenoid valves.' },
      { title: 'Bottom Compartment Not Cooling (Twin Cooling)', description: 'Resolving evaporator frost buildup, defrost bimetal sensor defects, and internal damper flap jams.' },
      { title: 'E1 / E2 PCB Sensor Error in ACs', description: 'Replacing temperature thermistors and repairing indoor ambient air sensor circuitry.' },
      { title: 'Loud Drum Thumping on Spin Cycle', description: 'Replacing worn shock absorbers, suspension rods, and heavy-duty tub bearings.' }
    ],
    faqs: [
      { q: 'Can you fix Samsung EcoBubble and Digital Inverter machines?', a: 'Yes. Our technicians are factory-trained in Samsung digital electronics, EcoBubble generators, and inverter motor assemblies.' },
      { q: 'How do you charge for Samsung doorstep diagnosis?', a: 'We charge a nominal inspection fee which covers comprehensive on-site diagnostics. An upfront quotation is provided before any repair work starts.' },
      { q: 'Do you service Samsung Smart TVs and QLED displays?', a: 'Yes. We repair Samsung LED, QLED, and Crystal 4K TV motherboards, power supplies, and backlight panels.' },
      { q: 'What warranty is offered on replaced Samsung parts?', a: 'We offer a 30-day warranty on all replaced spare parts and repair labor.' }
    ],
    gallery: [
      { src: 'https://ik.imagekit.io/b2gtgefhu/d278666f-2420-4fb5-bfce-1bc87b81eb66.png', alt: 'Samsung EcoBubble Front Load & Wobble Top Load Washing Machine Repair and Service in India', title: 'Samsung EcoBubble Washer Service', category: 'Washing Machine' },
      { src: 'https://ik.imagekit.io/b2gtgefhu/249e3ffb-ef36-4a3c-9e60-e0f0487bd388.png', alt: 'Samsung SpaceMax Twin Cooling Inverter Refrigerator Repair and Compressor Service in India', title: 'Samsung SpaceMax Fridge Repair', category: 'Refrigerator' },
      { src: 'https://ik.imagekit.io/b2gtgefhu/8f7b0c50-883b-4672-becd-9d9104223d8a.png', alt: 'Samsung Digital Inverter & WindFree Split AC Repair, Gas Refill and Servicing in India', title: 'Samsung Inverter AC Servicing', category: 'Air Conditioner' },
      { src: 'https://ik.imagekit.io/b2gtgefhu/6683d7ab-a37d-45aa-ad3c-91680e73fc3b.png', alt: 'Samsung 28L Slim Fry Ceramic Enamel Convection Microwave Oven Diagnostics and Repair in India', title: 'Samsung Slim Fry Microwave Repair', category: 'Microwave' },
      { src: 'https://ik.imagekit.io/b2gtgefhu/8a1db1e5-0a78-48bb-8c29-71acbe5230cd.png', alt: 'Samsung Smart TV, Crystal 4K, QLED & OLED Display Panel and Motherboard Service in India', title: 'Samsung Smart TV Diagnostics', category: 'Television' },
      { src: '/images/brands/samsung/samsung-gallery-6.webp', alt: 'Certified doorstep engineer delivering verified invoice and service warranty for Samsung appliance repair', title: 'Samsung Doorstep Resolution', category: 'Service Guarantee' }
    ]
  },
  {
    slug: 'whirlpool',
    name: 'Whirlpool',
    title: 'Whirlpool Appliance Repair & Service in India',
    tagline: 'Reliable Doorstep Support for Whirlpool 6th Sense Appliances & IntelliFresh Fridges',
    heroImage: 'https://ik.imagekit.io/b2gtgefhu/a2db8549-594c-4318-8c55-b794e35c6c6d.png',
    heroImages: [
      { src: 'https://ik.imagekit.io/b2gtgefhu/a2db8549-594c-4318-8c55-b794e35c6c6d.png', alt: 'Whirlpool IntelliFresh & 6th Sense Appliance Repair and Service Support in India', tagline: 'Certified Whirlpool Support' }
    ],
    description: 'Professional out-of-warranty repair for Whirlpool refrigerators, washing machines, 3D Cool air conditioners, and microwaves across India.',
    overviewParagraphs: [
      'Whirlpool appliances feature 6th Sense® intelligent sensor technology, designed to dynamically adjust power, water levels, and cooling temperatures. When component failure disrupts this automated balance, specialized diagnostic testing is necessary.',
      'Our team specializes in Whirlpool IntelliFresh inverter refrigerators, BloomWash washing machines, and 3D Cool split air conditioners. We carry genuine-grade replacement relays, thermostat sensors, drain valves, and control micro-circuits.',
      'Enjoy hassle-free doorstep repair across Delhi, Gurgaon, Noida, and Faridabad with transparent pricing, zero hidden charges, and quick turnaround times.'
    ],
    supportedModels: [
      'Whirlpool BloomWash & 360 BloomWash Pro',
      'Whirlpool Stainwash & WhiteMagic Series',
      'Whirlpool IntelliFresh & Protton 3-Door Refrigerators',
      'Whirlpool 3D Cool & Magicool Inverter ACs',
      'Whirlpool Magicook & Jet Cuisine Microwaves'
    ],
    seoTitle: 'Whirlpool Appliance Repair in India | Customer Care',
    seoDescription: 'Reliable Whirlpool appliance repair in Delhi, Noida, Gurugram & Faridabad. Expert doorstep service for Whirlpool Washing Machines, Fridges & ACs. Call now!',
    services: [
      { name: 'Whirlpool Washing Machine Repair', description: 'Fixing agitator issues, spin bowl imbalance, water intake solenoid errors, and electronic control cards.', iconType: 'washing-machine' },
      { name: 'Whirlpool Refrigerator Service', description: 'Restoring cooling in Protton 3-door & double-door models, gas recharging, and electronic thermostat repairs.', iconType: 'refrigerator' },
      { name: 'Whirlpool Air Conditioner Service', description: 'Filter chemical cleaning, capacitor replacement, copper coil brazing, and 3D Cool PCB repairs.', iconType: 'ac' },
      { name: 'Whirlpool Microwave Oven Repair', description: 'Fixing convection heating elements, turntable drive gears, and high-frequency magnetrons.', iconType: 'microwave' }
    ],
    commonProblems: [
      { title: 'Excessive Vibration in BloomWash Machines', description: 'Calibrating suspension rods, drum counterweights, and drive belt tensioners.' },
      { title: 'Ice Formation on Refrigerator Coils', description: 'Replacing defective defrost timers, thermal fuses, and bimetal thermostats.' },
      { title: 'Weak Airflow & Reduced Cooling in AC', description: 'Clearing choked condenser fins, servicing blower fan motors, and refilling refrigerant.' }
    ],
    faqs: [
      { q: 'Do you repair Whirlpool 6th Sense IntelliFresh appliances?', a: 'Yes. Our engineers are experienced in diagnosing 6th Sense sensor boards and inverter compressors.' },
      { q: 'Is doorstep repair available in Gurugram and Noida?', a: 'Yes. We provide complete doorstep coverage across Gurugram, Noida, Greater Noida, Delhi, and Faridabad.' },
      { q: 'Do you use original compatible spare parts?', a: 'We source certified, heavy-duty replacement spares designed to match Whirlpool manufacturer specifications.' }
    ],
    gallery: [
      { src: 'https://ik.imagekit.io/b2gtgefhu/96b68f2d-0703-4293-b8fe-e5310817e354.png', alt: 'Whirlpool BloomWash & Front Load Washing Machine Repair and Service in India', title: 'Whirlpool Washing Machine Service', category: 'Washing Machine' },
      { src: 'https://ik.imagekit.io/b2gtgefhu/422cb12e-7772-4fab-8347-d4bac6f1431f.png', alt: 'Whirlpool IntelliFresh & French Door Frost-Free Refrigerator Repair and Compressor Service in India', title: 'Whirlpool Refrigerator Repair', category: 'Refrigerator' },
      { src: 'https://ik.imagekit.io/b2gtgefhu/d7678495-8b6f-4ecc-bf14-a70088e6fa4b.png', alt: 'Whirlpool 3D Cool Inverter Split AC Maintenance, Installation and Gas Refilling in India', title: 'Whirlpool 3D Cool AC Servicing', category: 'Air Conditioner' },
      { src: 'https://ik.imagekit.io/b2gtgefhu/d75d5e5f-0efd-4026-8e63-5735db4c6b5f.png', alt: 'Whirlpool Magicook & Convection Microwave Oven Repair and Magnetron Diagnostics in India', title: 'Whirlpool Microwave Diagnostics', category: 'Microwave' },
      { src: 'https://ik.imagekit.io/b2gtgefhu/519462a5-0fae-42e7-92ee-740298d698b3.png', alt: 'Whirlpool Smart TV Diagnostics, Display Panel, Motherboard & Audio Circuit Service in India', title: 'Whirlpool Smart TV Diagnostics', category: 'Television' },
      { src: '/images/brands/whirlpool/whirlpool-gallery-6.webp', alt: 'Technician explaining repaired Whirlpool home appliance maintenance to Indian family', title: 'Whirlpool Customer Handover', category: 'Service Guarantee' }
    ]
  },
  {
    slug: 'bosch',
    name: 'Bosch',
    title: 'Bosch Appliance Repair & Service Support in India',
    tagline: 'Premium Precision Service for German-Engineered Bosch Home Appliances',
    heroImage: 'https://ik.imagekit.io/b2gtgefhu/f8d1cb36-9b76-4a9c-ba3b-8618d8a73521.png',
    heroImages: [
      { src: 'https://ik.imagekit.io/b2gtgefhu/f8d1cb36-9b76-4a9c-ba3b-8618d8a73521.png', alt: 'Bosch German Engineered Home Appliances Repair and Service in India', tagline: 'Certified Bosch Support' }
    ],
    description: 'Specialized independent repair for Bosch front-load washing machines, VarioInverter refrigerators, dishwashers, and ovens across India.',
    overviewParagraphs: [
      'German engineering demands precision diagnostics. Bosch appliances—equipped with EcoSilence Drive™ brushless motors, AntiVibration™ sidewalls, and ActiveWater Plus sensors—require meticulous attention to mechanical tolerances and electronic calibration.',
      'Our senior engineers possess deep technical knowledge of Bosch Series 4, Series 6, and Series 8 appliances. We address complex PCB error codes (E18, E23, F21), motor driver circuits, and water level pressure transducers.',
      'Get premium, white-glove doorstep service for your Bosch appliances in India with complete transparency, detailed diagnostic explanations, and guaranteed workmanship.'
    ],
    supportedModels: [
      'Bosch Serie 4, Serie 6 & Serie 8 Front Load Washers',
      'Bosch EcoSilence Drive Top Loaders',
      'Bosch VarioInverter Bottom Freezer Refrigerators',
      'Bosch Built-in & Freestanding Dishwashers',
      'Bosch Serie 6 Convection Microwave Ovens'
    ],
    seoTitle: 'Bosch Appliance Repair in India | Customer Care',
    seoDescription: 'Specialized Bosch appliance repair in India. Expert technicians for Bosch Front Load Washing Machines & Refrigerators. Book your doorstep repair today!',
    services: [
      { name: 'Bosch Washing Machine Repair', description: 'Resolving E18 drainage errors, E23 leak protection faults, drum bearing replacements, and door seal gasket changes.', iconType: 'washing-machine' },
      { name: 'Bosch Refrigerator Service', description: 'VarioInverter compressor repairs, multi-airflow damper diagnostics, and electronic sensor replacements.', iconType: 'refrigerator' },
      { name: 'Bosch Dishwasher Repair', description: 'Fixing water heating issues, spray arm blockages, drain pump blockages, and electronic control boards.', iconType: 'washing-machine' },
      { name: 'Bosch Built-In Microwave Repair', description: 'Repairing touch controls, grill elements, magnetrons, and internal power boards.', iconType: 'microwave' }
    ],
    commonProblems: [
      { title: 'E18 / F18 Pump Time Out Error', description: 'Clearing foreign matter from the lint filter and replacing worn magnetic drain pumps.' },
      { title: 'Drum Not Spinning (F21 Motor Fault)', description: 'Servicing carbon brushes or repairing the electronic inverter motor driver module.' },
      { title: 'Door Lock Jammed (E32 / E34 Fault)', description: 'Replacing the electromagnetic door interlock switch and safety release mechanism.' }
    ],
    faqs: [
      { q: 'Are your technicians trained on Bosch Series 6 and 8 machines?', a: 'Yes. Our technicians specialize in European appliance engineering, including high-end Bosch Series 4, 6, and 8 models.' },
      { q: 'How do you handle Bosch E18 or E23 error codes?', a: 'Our technicians carry specialized Bosch diagnostic toolsets to inspect pump impellers, pressure switches, and AquaStop sensors on-site.' },
      { q: 'Is there a service warranty on Bosch repairs?', a: 'Yes. All Bosch repair jobs include a 30-day warranty covering replacement parts and technician labor.' }
    ],
    gallery: [
      { src: 'https://ik.imagekit.io/b2gtgefhu/1374e2a0-4f7d-4a36-a3b6-f3e705d38b72.png', alt: 'Bosch Serie 4 & Serie 6 Front Load Washing Machine Repair and EcoSilence Drum Maintenance in India', title: 'Bosch Serie 6 Washing Machine Service', category: 'Washing Machine' },
      { src: 'https://ik.imagekit.io/b2gtgefhu/ace8aae5-832e-4bbe-af5d-3d0f1541d453.png', alt: 'Bosch Serie 4 & Serie 6 VarioInverter Bottom Freezer Refrigerator Repair and Service in India', title: 'Bosch VarioInverter Fridge Service', category: 'Refrigerator' },
      { src: 'https://ik.imagekit.io/b2gtgefhu/4e0e01ca-ac93-499f-b6b5-b779378e15e9.png', alt: 'Bosch Climate Inverter Split Air Conditioner Maintenance, Gas Charging & PCB Diagnostics in India', title: 'Bosch Climate Inverter AC Service', category: 'Air Conditioner' },
      { src: '/images/brands/bosch/bosch-gallery-4.webp', alt: 'Electronics specialist calibrating Bosch built-in convection microwave control board', title: 'Bosch Built-in Microwave Repair', category: 'Microwave' },
      { src: '/images/brands/bosch/bosch-gallery-5.webp', alt: 'Display engineer repairing television motherboard circuitry and power supply unit', title: 'Smart TV Component Diagnostics', category: 'Television' },
      { src: '/images/brands/bosch/bosch-gallery-6.webp', alt: 'Technician completing repair with positive customer handover in New Delhi apartment', title: 'German Precision Quality Assured', category: 'Service Guarantee' }
    ]
  },
  {
    slug: 'ifb',
    name: 'IFB',
    title: 'IFB Appliance Repair & Service Support in India',
    tagline: 'Dedicated Doorstep Specialists for IFB Senator, Executive & FastCool Appliances',
    heroImage: 'https://ik.imagekit.io/b2gtgefhu/a7d42646-0916-4102-9f96-406691ab923d.png',
    heroImages: [
      { src: 'https://ik.imagekit.io/b2gtgefhu/a7d42646-0916-4102-9f96-406691ab923d.png', alt: 'IFB Home Appliances Repair and Service Support in India', tagline: 'Certified IFB Support' }
    ],
    description: 'Expert out-of-warranty repair for IFB front-load washing machines, top-loaders, microwave ovens, and FastCool air conditioners in India.',
    overviewParagraphs: [
      'IFB is a household staple in India known for heavy-duty front-load washing machines with Aqua Energie filter systems, CradleWash programs, and 3D Warm Soak technology. Keeping these systems running smoothly requires experienced technicians who understand IFB mechanical assemblies.',
      'We repair drum suspension mounts, spider arm shafts, digital program selector knobs, and heating elements for all popular IFB series including Senator, Executive, and Elena.',
      'Our service vans carry genuine-grade replacement components across Delhi, Noida, Gurgaon, Ghaziabad, and Faridabad for quick same-day doorstep resolution.'
    ],
    supportedModels: [
      'IFB Senator, Executive & Elite Front Load Washers',
      'IFB Deep Clean Top Load Washing Machines',
      'IFB FastCool & Gold Series Inverter ACs',
      'IFB 30L & 25L Convection Microwave Ovens'
    ],
    seoTitle: 'IFB Appliance Repair & Service in India | Customer Care',
    seoDescription: 'Expert IFB appliance repair across Delhi, Noida & Gurugram. Fast doorstep service for IFB Front Load Washing Machines, Microwaves & ACs. Call us today!',
    services: [
      { name: 'IFB Washing Machine Repair', description: 'Fixing drum shaking, door error codes, heating coil scale buildup, and program selector PCB faults.', iconType: 'washing-machine' },
      { name: 'IFB Refrigerator Service', description: 'Frost-free cooling restoration, gas charging, electronic sensor testing, and compressor diagnostics.', iconType: 'refrigerator' },
      { name: 'IFB Air Conditioner Service', description: 'FastCool cooling optimization, PCB repair, gas refilling, and indoor unit deep cleaning.', iconType: 'ac' },
      { name: 'IFB Microwave Oven Repair', description: 'Resolving turntable rotation stops, spark generation, keypad touch errors, and magnetron failure.', iconType: 'microwave' }
    ],
    commonProblems: [
      { title: 'dOOR / dr Error Code on Display', description: 'Replacing worn door latch switches and safety micro-switches.' },
      { title: 'Excessive Drum Noise During Spin', description: 'Replacing the central rear tub bearing kit and water seal gasket.' },
      { title: 'Water Not Heating in Wash Cycles', description: 'Testing and replacing scaled immersion heating elements and thermistors.' }
    ],
    faqs: [
      { q: 'Do you specialize in IFB Front Load Washers?', a: 'Yes. IFB front-loaders are one of our core specialties. We handle drum overhauls, spider arms, and PCB repairs daily.' },
      { q: 'How quickly can I get an IFB technician in India?', a: 'We schedule technician visits within 30 to 60 minutes of booking confirmation across all NCR sectors.' }
    ],
    gallery: [
      { src: 'https://ik.imagekit.io/b2gtgefhu/3a5d906e-c4e2-49e7-86c3-71cfe57202fe.png', alt: 'IFB Diva Aqua SX 6kg Front Load Washing Machine Repair and Service in India', title: 'IFB Diva Aqua Washing Machine Service', category: 'Washing Machine' },
      { src: 'https://ik.imagekit.io/b2gtgefhu/56578bd7-63bb-494b-aaa4-382864d107d0.png', alt: 'IFB Bottom Freezer Frost Free Refrigerator Repair and Compressor Diagnostics in India', title: 'IFB Bottom Freezer Refrigerator Repair', category: 'Refrigerator' },
      { src: 'https://ik.imagekit.io/b2gtgefhu/1f582725-1b6b-4437-9141-1996a046b1e6.png', alt: 'IFB FastCool Eco Inverter Split Air Conditioner Maintenance, Gas Refilling and PCB Diagnostics in India', title: 'IFB FastCool Eco Inverter AC Service', category: 'Air Conditioner' },
      { src: 'https://ik.imagekit.io/b2gtgefhu/dfb6eb95-df7f-404b-bf22-3bd3f9f73e4a.png', alt: 'IFB 20SC2 Convection Microwave Oven Repair and Multi-Stage Magnetron Diagnostics in India', title: 'IFB 20SC2 Microwave Diagnostics', category: 'Microwave' },
      { src: '/images/brands/ifb/ifb-gallery-5.webp', alt: 'Television technician repairing audio/video board connections on smart TV', title: 'TV Electronics Diagnostics', category: 'Television' },
      { src: '/images/brands/ifb/ifb-gallery-6.webp', alt: 'Friendly technician completing IFB home appliance repair with Indian customer in Noida', title: 'IFB Same-Day Service Assured', category: 'Service Guarantee' }
    ]
  },
  {
    slug: 'haier',
    name: 'Haier',
    title: 'Haier Appliance Repair & Service Support in India',
    tagline: 'Reliable Doorstep Support for Haier Bottom-Mounted Fridges & Inverter ACs',
    heroImage: 'https://ik.imagekit.io/b2gtgefhu/7d08039a-41c8-41da-aae3-2b011414db8f.png',
    heroImages: [
      { src: 'https://ik.imagekit.io/b2gtgefhu/7d08039a-41c8-41da-aae3-2b011414db8f.png', alt: 'Haier Inspired Living Smart Home Appliances Repair and Service in India', tagline: 'Certified Haier Support' }
    ],
    description: 'Prompt out-of-warranty service for Haier refrigerators, Direct Motion washing machines, inverter air conditioners, and LED TVs across India.',
    overviewParagraphs: [
      'Haier appliances are recognized for user-centric innovations, such as 8-in-1 convertible Bottom Mounted Refrigerators (BMR), Direct Motion motor washing machines, and Self-Clean inverter split ACs.',
      'Our independent service technicians specialize in repairing Haier inverter PCB boards, dual-fan cooling ducts, electronic defrost timers, and drain solenoid assemblies.',
      'Get dependable, same-day doorstep service across Delhi, Noida, Greater Noida, Gurugram, and Faridabad.'
    ],
    supportedModels: [
      'Haier Bottom Mounted (BMR) & French Door Fridges',
      'Haier Direct Motion Front Load Washers',
      'Haier Triple Inverter & Self-Clean Split ACs',
      'Haier Smart LED & 4K Android TVs'
    ],
    seoTitle: 'Haier Appliance Repair in India | Customer Care',
    seoDescription: 'Professional Haier appliance repair in India. Doorstep technician service for Haier Refrigerators, Washing Machines & ACs. Book your service visit now!',
    services: [
      { name: 'Haier Refrigerator Service', description: 'BMR cooling balance, defrost fan repairs, compressor replacement, and refrigerant charging.', iconType: 'refrigerator' },
      { name: 'Haier Washing Machine Repair', description: 'Direct Motion motor diagnostics, spin cycle error fixes, and water inlet valve repairs.', iconType: 'washing-machine' },
      { name: 'Haier Air Conditioner Repair', description: 'Triple Inverter PCB repairs, copper coil leak fixing, and gas refilling.', iconType: 'ac' },
      { name: 'Haier Smart TV Repair', description: 'Fixing backlight failures, motherboard reboot loops, and sound output issues.', iconType: 'tv' }
    ],
    commonProblems: [
      { title: 'Top Fridge Compartment Not Cooling in BMR', description: 'Repairing air damper motors and electronic thermistors controlling airflow distribution.' },
      { title: 'E4 Error in Washing Machine', description: 'Fixing unlevel tub load sensor errors and lid lock switch connectivity.' },
      { title: 'F3 / F4 Inverter AC PCB Error', description: 'Testing outdoor IPM modules and capacitor banks on the inverter board.' }
    ],
    faqs: [
      { q: 'Do you service Haier Bottom-Mounted Refrigerators?', a: 'Yes. We repair all Haier BMR and multi-door refrigerator cooling systems and inverter control boards.' },
      { q: 'What areas in India do you cover for Haier repair?', a: 'We cover Delhi, Noida, Greater Noida, Ghaziabad, Faridabad, and Gurugram.' }
    ],
    gallery: [
      { src: 'https://ik.imagekit.io/b2gtgefhu/ab700b62-3ea3-4c36-9a4e-24ceaa8619f9.png', alt: 'Haier Top Load Washing Machine Series Diagnostics and Repair in India', title: 'Haier Top Load Washer Service', category: 'Washing Machine' },
      { src: 'https://ik.imagekit.io/b2gtgefhu/7f13b892-85f9-4cf9-bba2-ff24f6cfe90f.png', alt: 'Haier Bottom Mounted BMR Frost Free Magic Convertible Refrigerator Repair and Service in India', title: 'Haier BMR Refrigerator Repair', category: 'Refrigerator' },
      { src: '/images/brands/haier/haier-gallery-3.webp', alt: 'Air conditioning technician cleaning and servicing Haier Self-Clean Inverter split AC in Delhi', title: 'Haier Inverter AC Servicing', category: 'Air Conditioner' },
      { src: 'https://ik.imagekit.io/b2gtgefhu/e8c6dbf0-6542-4400-97b0-c27968bbe25d.png', alt: 'Haier Floral Convection & Grill Microwave Oven Repair and Magnetron Diagnostics in India', title: 'Haier Convection Microwave Repair', category: 'Microwave' },
      { src: 'https://ik.imagekit.io/b2gtgefhu/93596c02-313b-4a22-9b2d-54f05f4eb5ac.png', alt: 'Haier 4K UHD Smart Android TV Display Panel, Motherboard and Backlight Repair in India', title: 'Haier 4K UHD Smart TV Repair', category: 'Television' },
      { src: '/images/brands/haier/haier-gallery-6.webp', alt: 'Satisfied customer in Ghaziabad home following successful Haier appliance repair', title: 'Haier Doorstep Reliability', category: 'Service Guarantee' }
    ]
  },
  {
    slug: 'hitachi',
    name: 'Hitachi',
    title: 'Hitachi Appliance Repair & Service in India',
    tagline: 'High-End Precision Diagnostics for Hitachi Inverter ACs & French Door Refrigerators',
    heroImage: 'https://ik.imagekit.io/b2gtgefhu/381d8495-cd19-48ff-9eac-131611c410ed.png',
    heroImages: [
      { src: 'https://ik.imagekit.io/b2gtgefhu/381d8495-cd19-48ff-9eac-131611c410ed.png', alt: 'Hitachi Home Appliances Repair and Service Support in India', tagline: 'Certified Hitachi Support' }
    ],
    description: 'Expert independent repair for premium Hitachi split/window air conditioners and multi-door French door refrigerators in India.',
    overviewParagraphs: [
      'Hitachi air conditioners and refrigerators represent top-tier Japanese climate control technology, featuring Expandable Tropical Inverters, FrostWash systems, and vacuum-insulated multi-compartment refrigerators.',
      'Servicing these sophisticated systems requires precision electronic testing tools and deep familiarity with Hitachi micro-controller circuitry and high-pressure refrigeration cycles.',
      'Our senior HVAC and refrigeration engineers provide specialized doorstep repair services across Delhi, Gurugram, Noida, and Faridabad.'
    ],
    supportedModels: [
      'Hitachi Kashikoi & Yoshi Inverter ACs',
      'Hitachi Window & Split Air Conditioners',
      'Hitachi French Door & Big French Refrigerators',
      'Hitachi Solfege Series Multi-Door Refrigerators'
    ],
    seoTitle: 'Hitachi Appliance Repair in India | Customer Care',
    seoDescription: 'Specialized Hitachi AC and Refrigerator repair in Delhi, Gurugram & Noida. Expert doorstep technicians for high-end Hitachi appliances. Call our helpline!',
    services: [
      { name: 'Hitachi Air Conditioner Repair', description: 'Tropical Inverter PCB repair, blower motor fixes, coil leak brazing, and gas recharging.', iconType: 'ac' },
      { name: 'Hitachi Refrigerator Service', description: 'Vacuum compartment seal repairs, inverter compressor diagnostics, and defrost sensor replacements.', iconType: 'refrigerator' },
      { name: 'Hitachi Washing Machine Service', description: 'Sensor calibration, drum motor diagnostics, drain pump clearance, and electronic board servicing.', iconType: 'washing-machine' },
      { name: 'Hitachi Microwave & Oven Repair', description: 'Magnetron replacement, touch control board repairs, heating element testing, and door interlock fixes.', iconType: 'microwave' }
    ],
    commonProblems: [
      { title: 'AC Timer LED Blinking Error', description: 'Interpreting blink codes to isolate indoor sensor, fan motor, or outdoor inverter board faults.' },
      { title: 'Insufficient Cooling in Peak Summer', description: 'Diagnosing clogged micro-channel condenser coils, expansion valves, and refrigerant pressure levels.' }
    ],
    faqs: [
      { q: 'Do you repair Hitachi Tropical Inverter ACs?', a: 'Yes. Our senior technicians specialize in Hitachi Expandable Tropical Inverter PCBs and brushless fan motors.' },
      { q: 'Are genuine compatible spare parts used for Hitachi?', a: 'We strictly use high-grade, certified replacement components to protect your investment in Hitachi appliances.' }
    ],
    gallery: [
      { src: 'https://ik.imagekit.io/b2gtgefhu/466fef67-be92-4aaa-8e1c-f60806513983.png', alt: 'Hitachi Xpand Cool & Inverter Window AC Diagnostics, Servicing and PCB Repair in India', title: 'Hitachi Inverter AC Servicing', category: 'Air Conditioner' },
      { src: 'https://ik.imagekit.io/b2gtgefhu/93aa77b7-c314-4b70-a98d-ad3058d187c1.png', alt: 'Hitachi 550L 2-Door Inverter Dual Fan Cooling Frost Free Refrigerator Repair and Compressor Service in India', title: 'Hitachi Inverter Refrigerator Repair', category: 'Refrigerator' },
      { src: '/images/brands/hitachi/hitachi-gallery-3.webp', alt: 'Technician checking refrigerant pressure and airflow on indoor split AC unit in Gurugram', title: 'Hitachi AC Gas Top-up & Calibration', category: 'Air Conditioner' },
      { src: '/images/brands/hitachi/hitachi-gallery-4.webp', alt: 'Electronics specialist troubleshooting high-voltage appliance circuit boards', title: 'Hitachi Control PCB Diagnostics', category: 'Electronics' },
      { src: 'https://ik.imagekit.io/b2gtgefhu/WhatsApp-Image-2025-12-21-at-4.35.30h-PM.jpg', alt: 'Hitachi Smart HDR10 4K LED TV Display Panel, Motherboard and Power Diagnostics in India', title: 'Hitachi Smart TV Diagnostics', category: 'Television' },
      { src: '/images/brands/hitachi/hitachi-gallery-6.webp', alt: 'Customer satisfaction handover following premium Hitachi appliance service in India', title: 'Hitachi Premium Support Guarantee', category: 'Service Guarantee' }
    ]
  },
  {
    slug: 'godrej',
    name: 'Godrej',
    title: 'Godrej Appliance Repair & Service in India',
    tagline: 'Trusted Doorstep Support for Godrej Edge, Eon & Inverter Appliances',
    heroImage: '/images/brands/godrej/godrej-hero-1.webp',
    heroImages: [
      { src: '/images/brands/godrej/godrej-hero-1.webp', alt: 'Godrej technician repairing Eon Allure washing machine motor and pulsator in Delhi home', tagline: 'Godrej Eon Washer Overhaul' },
      { src: '/images/brands/godrej/godrej-hero-2.webp', alt: 'Technician checking Godrej Edge Pro refrigerator thermostat and compressor relay', tagline: 'Godrej Edge Refrigerator Repair' },
      { src: '/images/brands/godrej/godrej-hero-3.webp', alt: 'HVAC specialist servicing Godrej Green Balance Inverter AC unit in Faridabad', tagline: 'Green Balance AC Servicing' },
      { src: '/images/brands/godrej/godrej-hero-4.webp', alt: 'Electronics specialist repairing smart TV power circuit and motherboard components', tagline: 'Smart TV Power Board Diagnostics' }
    ],
    description: 'Affordable, reliable out-of-warranty repair for Godrej refrigerators, washing machines, and air conditioners across India.',
    overviewParagraphs: [
      'Godrej appliances have earned decades of trust in Indian homes. From energy-efficient Edge Pro direct-cool refrigerators to Eon Allure washing machines and green inverter air conditioners, Godrej appliances are built for durability.',
      'We provide fast, transparent doorstep repair services for all Godrej models, replacing worn thermostats, gas relays, drain valves, and wash motors with genuine-grade parts.',
      'Book a technician visit in Delhi, Noida, Gurugram, Ghaziabad, or Faridabad for same-day service.'
    ],
    supportedModels: [
      'Godrej Edge Pro & Edge Digi Single Door Fridges',
      'Godrej Eon & Eon Vibe Double Door Refrigerators',
      'Godrej Eon Allure & WT Eon Washers',
      'Godrej Green Balance & Turbo Inverter ACs'
    ],
    seoTitle: 'Godrej Appliance Repair in India | Customer Care',
    seoDescription: 'Trusted Godrej appliance repair in India. Affordable doorstep service for Godrej Refrigerators, Washing Machines & ACs. Book your expert visit today!',
    services: [
      { name: 'Godrej Refrigerator Service', description: 'Thermostat replacement, gas refilling, relay/OLP replacement, and door gasket sealing.', iconType: 'refrigerator' },
      { name: 'Godrej Washing Machine Repair', description: 'Fixing drum rotation issues, pulsator repairs, drain choke removal, and timer switch replacements.', iconType: 'washing-machine' },
      { name: 'Godrej Air Conditioner Service', description: 'Cooling coil leak repairs, fan motor replacements, capacitor changes, and gas top-up.', iconType: 'ac' },
      { name: 'Godrej Microwave Repair', description: 'Fixing heating problems, keypad membrane replacements, and turntable motor repair.', iconType: 'microwave' }
    ],
    commonProblems: [
      { title: 'Freezer Cooling But Lower Compartment Warm', description: 'Fixing defrost timer contacts, thermal bimetals, and evaporator fan motors.' },
      { title: 'Water Draining Slowly in Top Loaders', description: 'Removing lint debris from drain valves and replacing worn drain bellows.' }
    ],
    faqs: [
      { q: 'Do you repair older Godrej refrigerator models?', a: 'Yes. We service both legacy Godrej direct-cool models and the newest inverter multi-door series.' },
      { q: 'Are spare parts available for Godrej washing machines and ACs?', a: 'Yes. Our technicians carry original-compatible relays, capacitors, motors, and electronic boards for fast doorstep fixes.' }
    ],
    gallery: [
      { src: '/images/brands/godrej/godrej-gallery-1.webp', alt: 'Technician replacing pulsator and drive belt on Godrej Eon Allure washing machine in Delhi home', title: 'Godrej Eon Washing Machine Service', category: 'Washing Machine' },
      { src: '/images/brands/godrej/godrej-gallery-2.webp', alt: 'Doorstep technician inspecting Godrej Edge Pro direct cool refrigerator relay and thermostat', title: 'Godrej Edge Refrigerator Repair', category: 'Refrigerator' },
      { src: '/images/brands/godrej/godrej-gallery-3.webp', alt: 'HVAC engineer servicing Godrej Green Balance split AC unit in Faridabad apartment', title: 'Godrej Inverter AC Servicing', category: 'Air Conditioner' },
      { src: '/images/brands/godrej/godrej-gallery-4.webp', alt: 'Specialist testing microwave oven magnetron and high-frequency wave guide', title: 'Godrej Microwave Oven Repair', category: 'Microwave' },
      { src: '/images/brands/godrej/godrej-gallery-5.webp', alt: 'Technician inspecting TV motherboard and LED display driver circuits', title: 'Smart TV Display Diagnostics', category: 'Television' },
      { src: '/images/brands/godrej/godrej-gallery-6.webp', alt: 'Customer in Delhi receiving service guarantee card after Godrej appliance repair', title: 'Godrej Reliable Home Support', category: 'Service Guarantee' }
    ]
  },
  {
    slug: 'sony',
    name: 'Sony',
    title: 'Sony BRAVIA TV Repair & Service in India',
    tagline: 'Precision Electronics Diagnosis for Sony BRAVIA OLED, 4K HDR & Google TVs',
    heroImage: 'https://ik.imagekit.io/b2gtgefhu/000385da-1df1-476c-bffc-ffb449db3f2b.png',
    heroImages: [
      { src: 'https://ik.imagekit.io/b2gtgefhu/000385da-1df1-476c-bffc-ffb449db3f2b.png', alt: 'Sony BRAVIA TV Repair and Certified Doorstep Service Support in India', tagline: 'Certified Sony BRAVIA Support' }
    ],
    description: 'Expert doorstep repair for Sony BRAVIA LED, OLED, 4K HDR, and Android Smart televisions across India.',
    overviewParagraphs: [
      'Sony BRAVIA televisions are globally renowned for their visual fidelity, powered by Cognitive Processor XR™, Triluminos™ display panels, and Acoustic Surface Audio systems.',
      'When your Sony TV experiences power supply interruptions, six-time red light blinking codes, sound without picture, or motherboard software loops, you need a specialized micro-soldering and panel engineer.',
      'Our team provides doorstep TV diagnostics across India, resolving power module faults, T-Con board timing errors, and LED backlight failures.'
    ],
    supportedModels: [
      'Sony BRAVIA XR OLED & Master Series (A80L, A95L)',
      'Sony BRAVIA 3 4K HDR Series (S30 / X80L)',
      'Sony BRAVIA 4K Ultra HD LED & Google TVs',
      'Sony Full HD & 32-inch HD X-Protection PRO Series',
      'Sony Full Array LED & Mini LED Series (X90L, X95L)'
    ],
    seoTitle: 'Sony TV Repair & Service in India | Customer Care',
    seoDescription: 'Expert Sony BRAVIA TV repair service in India. Doorstep diagnostics for Sony OLED, 4K HDR & LED TVs. Red light blinking & display fixes. Call us now!',
    services: [
      { name: 'Sony BRAVIA Display Repair', description: 'Fixing horizontal lines on screen, ghosting, dark screen with audio, and LED backlight replacement.', iconType: 'tv' },
      { name: 'Sony Motherboard & Power Board Repair', description: 'Component-level micro-soldering, power supply module repair, and boot-loop recovery.', iconType: 'tv' },
      { name: 'Sony Sound & Port Troubleshooting', description: 'Repairing Acoustic Surface audio ICs, HDMI ARC port damage, and optical audio output faults.', iconType: 'tv' }
    ],
    commonProblems: [
      { title: 'Red Light Blinking 6 Times (Backlight Error)', description: 'Diagnosing LED strip open-circuits and backlight inverter driver circuitry.' },
      { title: 'Sound Working But Screen Is Completely Black', description: 'Testing T-Con board voltage rails (VGH/VGL) and replacing burnt LED backlight arrays.' },
      { title: 'TV Stuck on Sony Logo / Android Boot Loop', description: 'Reflashing corrupted eMMC NAND flash memory on the main processor board.' }
    ],
    faqs: [
      { q: 'What does the Sony TV red blinking light mean?', a: 'The number of blinks indicates a specific hardware diagnostic code. For example, 6 blinks indicates a backlight or power inverter circuit issue.' },
      { q: 'Do you repair Sony BRAVIA TVs at my home?', a: 'Yes. We inspect and repair motherboard, power supply, and backlight issues right at your doorstep.' },
      { q: 'Do you service Sony BRAVIA OLED and 4K Google TVs?', a: 'Yes. Our senior engineers specialize in Sony XR OLED panels, Cognitive Processor motherboards, and Google TV firmware.' }
    ],
    gallery: [
      { src: 'https://ik.imagekit.io/b2gtgefhu/af344f4d-fae7-4546-ad4e-a07c3e27ee38.png', alt: 'Sony BRAVIA XR 55 inch OLED 4K UHD Dolby Vision Atmos TV diagnostics and motherboard service in India', title: 'Sony BRAVIA XR 55" OLED 4K TV Diagnostics', category: 'Television' },
      { src: 'https://ik.imagekit.io/b2gtgefhu/165b5eeb-0c9e-4b2e-b1da-6f2922a98159.png', alt: 'Sony BRAVIA 3 55 inch 4K Ultra HD X1 Processor Smart TV repair and panel service in India', title: 'Sony BRAVIA 3 55" 4K Ultra HD TV', category: 'Television' },
      { src: 'https://ik.imagekit.io/b2gtgefhu/b23ac65d-040c-4b62-be97-5eedf6eaec00.png', alt: 'Sony BRAVIA 4K HDR TRILUMINOS Google TV Dolby Vision Atmos motherboard and backlight repair in India', title: 'Sony BRAVIA 4K HDR TRILUMINOS Google TV', category: 'Television' },
      { src: 'https://ik.imagekit.io/b2gtgefhu/baf02223-bd72-4024-989e-c3675d671c4d.png', alt: 'Sony Full HD 1080p Smart TV with X-Reality PRO and ClearAudio+ audio IC repair in India', title: 'Sony Full HD Smart TV (X-Reality PRO)', category: 'Television' },
      { src: 'https://ik.imagekit.io/b2gtgefhu/c197d096-aaf4-4ad8-b0e8-c5742b689737.png', alt: 'Sony BRAVIA Google TV 4K Series screen replacement and power board diagnostics in India', title: 'Sony BRAVIA Google TV Smart Series', category: 'Television' },
      { src: 'https://ik.imagekit.io/b2gtgefhu/e583be99-b237-4077-a56a-04947104c231.png', alt: 'Sony BRAVIA 32 inch HD LED TV with X-Protection PRO and Multi-Indian Languages repair in India', title: 'Sony BRAVIA 32" HD LED (X-Protection PRO)', category: 'Television' },
      { src: 'https://ik.imagekit.io/b2gtgefhu/cd364e07-ab0a-4750-9e98-5da8b64802b8.png', alt: 'Sony BRAVIA 3 Series 4K HDR Smart TV display panel and backlight strip replacement in India', title: 'Sony BRAVIA 3 4K HDR Display Diagnostics', category: 'Television' },
      { src: 'https://ik.imagekit.io/b2gtgefhu/ee31240c-d281-4fb5-a23f-40c42f7120b2.png', alt: 'Sony 4K HDR Google TV with X1 4K Processor and Ok Google voice search repair in India', title: 'Sony 4K HDR Google TV (X1 Processor)', category: 'Television' }
    ]
  },
  {
    slug: 'panasonic',
    name: 'Panasonic',
    title: 'Panasonic Appliance Repair & Service in India',
    tagline: 'Expert Care for Panasonic MiraIE Smart ACs, Econavi Fridges & Washers',
    heroImage: '/images/brands/panasonic/panasonic-hero-1.webp',
    heroImages: [
      { src: '/images/brands/panasonic/panasonic-hero-1.webp', alt: 'Panasonic technician servicing MiraIE Smart Inverter split AC in Gurgaon residence', tagline: 'MiraIE Smart Inverter AC Servicing' },
      { src: '/images/brands/panasonic/panasonic-hero-2.webp', alt: 'Technician diagnosing StainMaster washing machine electronic control unit in Delhi', tagline: 'StainMaster Washing Machine Repair' },
      { src: '/images/brands/panasonic/panasonic-hero-3.webp', alt: 'Specialist inspecting Panasonic Econavi refrigerator inverter compressor and sensors', tagline: 'Econavi Inverter Refrigerator Care' },
      { src: '/images/brands/panasonic/panasonic-hero-4.webp', alt: 'Television technician testing Panasonic 4K Smart TV display panel and motherboard', tagline: 'Panasonic 4K TV Diagnostics' }
    ],
    description: 'Professional out-of-warranty support for Panasonic inverter air conditioners, washing machines, microwaves, and Smart TVs in India.',
    overviewParagraphs: [
      'Panasonic home appliances blend Japanese reliability with smart connectivity, such as MiraIE IoT-enabled air conditioners, Econavi sensor-equipped refrigerators, and StainMaster washing machines.',
      'Our technicians are proficient in handling Panasonic micro-controller circuit boards, inverter motor drives, and electronic expansion valves.',
      'We provide timely doorstep service across all sectors of Delhi, Noida, Gurgaon, Ghaziabad, and Faridabad.'
    ],
    supportedModels: [
      'Panasonic MiraIE Smart Inverter Split ACs',
      'Panasonic Econavi Prime Fresh Refrigerators',
      'Panasonic StainMaster+ Top & Front Load Washers',
      'Panasonic Convection & Grill Microwave Ovens',
      'Panasonic 4K Smart Android TVs'
    ],
    seoTitle: 'Panasonic Appliance Repair in India | Customer Care',
    seoDescription: 'Professional Panasonic appliance repair in India. Doorstep service for Panasonic Air Conditioners, Washing Machines & Microwaves. Book your visit now!',
    services: [
      { name: 'Panasonic Air Conditioner Repair', description: 'MiraIE PCB repair, indoor coil chemical washing, gas refilling, and compressor diagnostics.', iconType: 'ac' },
      { name: 'Panasonic Washing Machine Repair', description: 'StainMaster heater circuit repair, drum bearing replacement, and water drain valve fixes.', iconType: 'washing-machine' },
      { name: 'Panasonic Microwave Oven Repair', description: 'Magnetron replacement, touchpad repair, high-voltage diode fixes, and door latch repair.', iconType: 'microwave' },
      { name: 'Panasonic Smart TV Repair', description: 'Fixing screen display issues, motherboard failures, and power supply unit repairs.', iconType: 'tv' }
    ],
    commonProblems: [
      { title: 'H11 / H16 Inverter AC Error Codes', description: 'Resolving communication signal failure between indoor and outdoor PCB units.' },
      { title: 'U11 Water Drainage Error in Washing Machines', description: 'Clearing drain pump chokes and checking electronic pressure switch contacts.' }
    ],
    faqs: [
      { q: 'Do you service Panasonic MiraIE Inverter ACs?', a: 'Yes. We diagnose and repair Panasonic Wi-Fi and IoT-enabled MiraIE inverter control boards.' },
      { q: 'How fast can a technician arrive for Panasonic repair?', a: 'We offer same-day doorstep scheduling across Delhi, Gurugram, Noida, and Faridabad.' }
    ],
    gallery: [
      { src: '/images/brands/panasonic/panasonic-gallery-1.webp', alt: 'Technician servicing Panasonic MiraIE Smart Inverter split AC with pressure gauges in Gurgaon home', title: 'Panasonic MiraIE AC Servicing', category: 'Air Conditioner' },
      { src: '/images/brands/panasonic/panasonic-gallery-2.webp', alt: 'Diagnostic engineer testing Panasonic StainMaster washing machine electronic control unit', title: 'Panasonic StainMaster Washer Repair', category: 'Washing Machine' },
      { src: '/images/brands/panasonic/panasonic-gallery-3.webp', alt: 'Specialist inspecting Panasonic Econavi Prime Fresh refrigerator inverter compressor', title: 'Panasonic Econavi Refrigerator Service', category: 'Refrigerator' },
      { src: '/images/brands/panasonic/panasonic-gallery-4.webp', alt: 'Technician repairing Panasonic convection microwave touchpad and magnetron on test bench', title: 'Panasonic Microwave Repair', category: 'Microwave' },
      { src: '/images/brands/panasonic/panasonic-gallery-5.webp', alt: 'Television engineer testing Panasonic 4K Smart TV display panel and motherboard', title: 'Panasonic 4K TV Diagnostics', category: 'Television' },
      { src: '/images/brands/panasonic/panasonic-gallery-6.webp', alt: 'Homeowner in India smiling after successful repair of Panasonic appliances', title: 'Panasonic Doorstep Assurance', category: 'Service Guarantee' }
    ]
  },
  {
    slug: 'sharp',
    name: 'Sharp',
    title: 'Sharp Appliance & TV Repair in India',
    tagline: 'Specialized Service for Sharp J-Tech Inverter Fridges, Microwaves & Aquos TVs',
    heroImage: '/images/brands/sharp/sharp-hero-1.webp',
    heroImages: [
      { src: '/images/brands/sharp/sharp-hero-1.webp', alt: 'Sharp technician repairing Carousel microwave oven heating element on workshop test bench', tagline: 'Sharp Carousel Microwave Diagnostics' },
      { src: '/images/brands/sharp/sharp-hero-2.webp', alt: 'Service engineer inspecting Sharp J-Tech Inverter refrigerator compressor in Indian kitchen', tagline: 'J-Tech Inverter Refrigerator Repair' },
      { src: '/images/brands/sharp/sharp-hero-3.webp', alt: 'HVAC technician checking cooling lines on split air conditioner outdoor condenser unit', tagline: 'Residential AC Condenser Servicing' },
      { src: '/images/brands/sharp/sharp-hero-4.webp', alt: 'Television engineer testing Sharp Aquos 4K LED TV backlight and motherboard in living room', tagline: 'Sharp Aquos 4K TV Diagnostics' }
    ],
    description: 'Precision out-of-warranty service for Sharp microwave ovens, J-Tech inverter refrigerators, and Aquos LED TVs in India.',
    overviewParagraphs: [
      'Sharp is known worldwide for its pioneer microwave ovens, Plasmacluster ion air purifiers, J-Tech Inverter refrigeration systems, and Aquos LED displays.',
      'Our skilled technicians provide dedicated doorstep diagnostic support for Sharp appliances across India, using specialized tools and genuine-grade replacement parts.',
      'Fast, reliable, and transparent repair solutions with a 30-day service warranty.'
    ],
    supportedModels: [
      'Sharp Carousel & Convection Microwave Ovens',
      'Sharp J-Tech Inverter Multi-Door Refrigerators',
      'Sharp Aquos 4K LED & Smart TVs'
    ],
    seoTitle: 'Sharp Appliance & TV Repair in India | Customer Care',
    seoDescription: 'Expert Sharp appliance repair across Delhi, Noida & Gurugram. Doorstep service for Sharp Microwave Ovens, Refrigerators & Aquos TVs. Call our team today!',
    services: [
      { name: 'Sharp Microwave Oven Repair', description: 'Specialized magnetron replacement, turntable motor repair, keypad membrane fixes, and high-voltage repairs.', iconType: 'microwave' },
      { name: 'Sharp Refrigerator Service', description: 'J-Tech inverter compressor diagnostics, defrost system repairs, and gas refilling.', iconType: 'refrigerator' },
      { name: 'Sharp Aquos TV Repair', description: 'Backlight repair, power supply unit repairs, and motherboard circuit troubleshooting.', iconType: 'tv' }
    ],
    commonProblems: [
      { title: 'Microwave Tripping Household MCB', description: 'Isolating and replacing shorted primary door interlock switches or high-voltage transformers.' },
      { title: 'Uneven Heating in Convection Mode', description: 'Testing convection heating elements and thermostatic temperature sensors.' }
    ],
    faqs: [
      { q: 'Do you repair Sharp Microwave Ovens?', a: 'Yes. Sharp microwaves are one of our core specialties, including convection, grill, and commercial units.' },
      { q: 'Do you repair Sharp Aquos LED and Smart TVs?', a: 'Yes. We service Aquos LED backlights, power supplies, motherboard chips, and display panels.' }
    ],
    gallery: [
      { src: '/images/brands/sharp/sharp-gallery-1.webp', alt: 'Electronics specialist testing Sharp Carousel microwave oven high-voltage diode and magnetron', title: 'Sharp Carousel Microwave Repair', category: 'Microwave' },
      { src: '/images/brands/sharp/sharp-gallery-2.webp', alt: 'Engineer inspecting Sharp J-Tech Inverter refrigerator compressor in modular Indian kitchen', title: 'Sharp J-Tech Refrigerator Check', category: 'Refrigerator' },
      { src: '/images/brands/sharp/sharp-gallery-3.webp', alt: 'AC technician checking refrigerant lines on split air conditioning outdoor unit', title: 'Air Conditioner Cooling Service', category: 'Air Conditioner' },
      { src: '/images/brands/sharp/sharp-gallery-4.webp', alt: 'Technician testing electronic keypad membrane and microcontroller on microwave oven', title: 'Microwave Keypad Diagnostics', category: 'Microwave' },
      { src: '/images/brands/sharp/sharp-gallery-5.webp', alt: 'Television engineer repairing Sharp Aquos 4K LED TV backlight and timing controller', title: 'Sharp Aquos 4K TV Diagnostics', category: 'Television' },
      { src: '/images/brands/sharp/sharp-gallery-6.webp', alt: 'Customer in Noida receiving verified repair receipt for Sharp appliance service', title: 'Sharp Japanese Quality Restored', category: 'Service Guarantee' }
    ]
  },
  {
    slug: 'marq',
    name: 'Marq',
    title: 'Marq Appliance Repair & Service Support in India',
    tagline: 'Affordable Doorstep Service for Marq Inverter ACs, Washing Machines & Smart TVs',
    heroImage: '/images/brands/marq/marq-hero-1.webp',
    heroImages: [
      { src: '/images/brands/marq/marq-hero-1.webp', alt: 'Marq service technician testing inverter split AC cooling lines and electrical wiring in Delhi', tagline: 'Marq Inverter Split AC Diagnostics' },
      { src: '/images/brands/marq/marq-hero-2.webp', alt: 'Technician replacing drive belt and drain motor on Marq TurboWash washing machine', tagline: 'TurboWash Washing Machine Service' },
      { src: '/images/brands/marq/marq-hero-3.webp', alt: 'HVAC engineer servicing residential air conditioning outdoor condenser in Gurgaon', tagline: 'Outdoor AC Condenser Maintenance' },
      { src: '/images/brands/marq/marq-hero-4.webp', alt: 'Display specialist testing smart TV motherboard and Android OS processor board', tagline: 'Smart TV Motherboard Diagnostics' }
    ],
    description: 'Reliable, affordable out-of-warranty doorstep repair for Marq (by Flipkart) air conditioners, washing machines, and Smart TVs in India.',
    overviewParagraphs: [
      'Marq by Flipkart provides value-packed appliances for Indian homes. When your Marq split AC, semi/fully-automatic washing machine, or Android TV develops an issue, our technicians deliver prompt and cost-effective repair solutions.',
      'We troubleshoot control boards, motor capacitors, drain pumps, and cooling circuits to restore your appliances to top shape without excessive costs.',
      'Same-day doorstep service available across Delhi, Noida, Gurugram, Ghaziabad, and Faridabad.'
    ],
    supportedModels: [
      'Marq TurboWash Fully-Automatic Washing Machines',
      'Marq 4-in-1 Convertible Inverter Split ACs',
      'Marq Smart Android LED TVs (32" to 55")'
    ],
    seoTitle: 'Marq Appliance Repair & Service in India | Customer Care',
    seoDescription: 'Fast & affordable Marq appliance repair across India. Doorstep technician service for Marq ACs, Washing Machines & Smart TVs. Book your service today!',
    services: [
      { name: 'Marq Air Conditioner Repair', description: 'Inverter PCB troubleshooting, copper coil leak testing, gas refilling, and deep chemical cleaning.', iconType: 'ac' },
      { name: 'Marq Washing Machine Repair', description: 'Fixing drain motor failures, water level sensor errors, and agitator belt replacements.', iconType: 'washing-machine' },
      { name: 'Marq Smart TV Repair', description: 'Resolving LED backlight issues, Android OS boot problems, and power supply repairs.', iconType: 'tv' }
    ],
    commonProblems: [
      { title: 'E1 Error in Marq Split AC', description: 'Repairing indoor room temperature sensor and PCB communication lines.' },
      { title: 'Washing Machine Not Spinning', description: 'Replacing broken drive belts and testing spin motor capacitors.' }
    ],
    faqs: [
      { q: 'Do you provide doorstep repair for Marq appliances?', a: 'Yes. We provide full doorstep repair for Marq ACs, washing machines, and TVs across India.' },
      { q: 'How do I book a Marq repair technician?', a: 'Simply call our customer care number at +91 8008070025 or click "Book a Service" on this page.' }
    ],
    gallery: [
      { src: '/images/brands/marq/marq-gallery-1.webp', alt: 'Technician checking refrigerant pressure and electrical lines on Marq Inverter Split AC in Delhi', title: 'Marq Inverter AC Servicing', category: 'Air Conditioner' },
      { src: '/images/brands/marq/marq-gallery-2.webp', alt: 'Engineer replacing drive belt and drain motor on Marq TurboWash washing machine in Ghaziabad', title: 'Marq TurboWash Washer Service', category: 'Washing Machine' },
      { src: '/images/brands/marq/marq-gallery-3.webp', alt: 'AC technician checking cooling performance on residential outdoor AC condenser unit', title: 'Outdoor AC Condenser Service', category: 'Air Conditioner' },
      { src: '/images/brands/marq/marq-gallery-4.webp', alt: 'Television specialist testing display and Android OS boot board on Marq 4K TV', title: 'Marq Smart Android TV Repair', category: 'Television' },
      { src: '/images/brands/marq/marq-gallery-5.webp', alt: 'Electronics technician testing power supply and board circuits for domestic appliances', title: 'Motherboard Circuit Testing', category: 'Electronics' },
      { src: '/images/brands/marq/marq-gallery-6.webp', alt: 'Happy customer family in India after prompt doorstep repair of Marq appliance', title: 'Marq Fast Doorstep Assistance', category: 'Service Guarantee' }
    ]
  }
];

export function getBrandBySlug(slug: string): BrandData | undefined {
  return brands.find(b => b.slug === slug);
}
