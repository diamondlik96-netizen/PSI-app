import type {
  Appointment,
  ClientLogo,
  Equipment,
  HistoryEntry,
  Invoice,
  OpenQuote,
  Project,
  Service,
  TeamMember,
  Thread,
} from './types';

export const industries = ['Hospitality', 'Education', 'Recreation', 'Government', 'Commercial'];
export const productTypes = [
  'Operable Partitions',
  'Bleachers',
  'Basketball Systems',
  'Volleyball Systems',
  'Divider Curtains',
  'Wall Padding',
];

export const projects: Project[] = [
  {
    id: 'p0',
    name: 'Orange County Convention Center — Phase 1 Operable Wall Installation',
    industry: 'Commercial',
    productType: 'Operable Partitions',
    location: 'Orlando, FL',
    featured: true,
    photo: '/assets/occc-aerial.png',
    photos: [
      { src: '/assets/occc-aerial.png', caption: 'One of the largest convention centers in the country — 7M sq ft, 2.1M sq ft of event space' },
      { src: '/assets/occc-gray-wall.png', caption: 'Completed run — panels over 40 feet high' },
      { src: '/assets/occc-door-wall.png', caption: 'Integrated pass doors within the new wall system' },
      { src: '/assets/occc-wall-10.png', caption: 'Hall 10 — full-height divisible wall, closed position' },
      { src: '/assets/occc-wall-12.png', caption: 'Hall 12 — completed installation' },
      { src: '/assets/occc-staging.png', caption: 'Panel staging on the exhibit floor' },
      { src: '/assets/occc-lift.png', caption: 'PSI crew setting trolley hardware at track height' },
    ],
    stats: [
      { value: '7M', label: 'sq ft building' },
      { value: '2.1M', label: 'sq ft event space' },
      { value: '600+', label: 'panels installed' },
      { value: "40'+", label: 'panel height' },
    ],
    summary:
      'Our crown jewel. Phase 1 of a full operable wall installation across one of the largest convention centers in the country — a 7 million square foot building with 2.1 million square feet of event space. PSI crews installed more than 600 operable wall panels, every one of them over 40 feet high.',
    testimonial: null,
  },
  {
    id: 'p0b',
    name: 'Grand Hyatt Washington — Event Space Operable Walls',
    industry: 'Hospitality',
    productType: 'Operable Partitions',
    location: 'Washington, DC',
    photo: '/assets/gh-entrance.png',
    photos: [
      { src: '/assets/gh-entrance.png', caption: 'Grand Hyatt Washington — downtown DC' },
      { src: '/assets/gh-atrium.png', caption: "The hotel's signature 12-story atrium" },
      { src: '/assets/gh-ballroom.png', caption: "Grand ballroom — 20'+ panels in the closed position" },
      { src: '/assets/gh-longwall.png', caption: 'PSI crew completing a full-length wall run with integrated pass doors' },
      { src: '/assets/gh-chandeliers.png', caption: 'Junior ballroom — acoustic panels dividing the space' },
      { src: '/assets/gh-passdoor.png', caption: 'Meeting-room divisions with flush pass doors' },
      { src: '/assets/gh-purple.png', caption: 'Divisible meeting space, walls closed' },
      { src: '/assets/gh-lifts.png', caption: 'Crews working at track height across parallel rooms' },
    ],
    stats: [
      { value: '45K+', label: 'sq ft event space' },
      { value: '5', label: 'floors of meeting space' },
      { value: "20'+", label: 'panels in the grand ballroom' },
      { value: 'DC', label: 'nationwide reach' },
    ],
    summary:
      "A full operable wall installation across the Grand Hyatt Washington's event program — more than 45,000 square feet of meeting and event space spanning five floors in the heart of downtown DC, anchored by 20-foot-plus panels in its largest ballroom.",
    testimonial: null,
  },
  {
    id: 'p0c',
    name: 'Gaylord National Resort — Convention Center Operable Walls',
    industry: 'Hospitality',
    productType: 'Operable Partitions',
    location: 'National Harbor, MD',
    photo: '/assets/gn-exterior.png',
    photos: [
      { src: '/assets/gn-exterior.png', caption: 'Gaylord National Resort & Convention Center — the largest non-gaming hotel and convention center on the East Coast' },
      { src: '/assets/gn-ballroom.png', caption: 'Ballroom-level operable walls in the closed position' },
      { src: '/assets/gn-tallroom.png', caption: 'Full-height panels dividing ballroom space floor to ceiling' },
      { src: '/assets/gn-exhibit-wall.png', caption: 'Exhibition-hall wall run — part of the 180,000 sq ft divisible hall' },
      { src: '/assets/gn-exhibit-lifts.png', caption: 'PSI crews staging lifts along a completed exhibit-hall run' },
      { src: '/assets/gn-track.png', caption: 'Overhead track and trolley hardware above the finished panels' },
    ],
    stats: [
      { value: '546K+', label: 'sq ft of event space' },
      { value: '50K', label: 'sq ft Potomac Ballroom' },
      { value: '180K', label: 'sq ft divisible exhibition hall' },
      { value: '19', label: 'story glass atrium' },
    ],
    summary:
      'Operable wall installation and service across the Gaylord National Resort & Convention Center — the largest non-gaming hotel and convention center on the East Coast, with more than 546,000 square feet of meeting and event space, a 50,000 sq ft Potomac Ballroom, and a 180,000 sq ft divisible exhibition hall, all beneath its signature 19-story glass atrium on the Potomac.',
    testimonial: null,
  },
  {
    id: 'p1',
    name: 'Vinoy Resort — Operable Wall Renovation',
    industry: 'Hospitality',
    productType: 'Operable Partitions',
    location: 'St. Petersburg, FL',
    photo: 'https://psicrew.com/wp-content/uploads/2026/06/PSI-PRODUCTS-HUFCOR-Vinoy-Resort-St-Petersburg-FL.jpg',
    summary:
      "Refurbished the resort's Hufcor operable wall system across its ballroom and meeting spaces, restoring like-new operation and acoustics.",
    testimonial: null,
  },
  {
    id: 'p2',
    name: 'United Corporate Campus — Operable Wall Service',
    industry: 'Commercial',
    productType: 'Operable Partitions',
    location: 'Atlanta, GA',
    photo: 'https://psicrew.com/wp-content/uploads/2026/06/PSI-HUFCOR-Services-United-Atlanta-Georgia.jpg',
    summary:
      "Ongoing preventive maintenance and repair service for the campus's movable wall systems, keeping conference space reconfigurable on demand.",
    testimonial: null,
  },
  {
    id: 'p3',
    name: 'Hillsborough County Schools — Gymnasium Equipment',
    industry: 'Education',
    productType: 'Basketball Systems',
    location: 'Hillsborough County, FL',
    photo: null,
    summary:
      'Supplied and installed electric wall-mounted basketball backstops and protective wall padding across district middle school gymnasiums.',
    testimonial: null,
  },
  {
    id: 'p4',
    name: 'YMCA Suncoast & Tampa — Multi-Court Divider System',
    industry: 'Recreation',
    productType: 'Divider Curtains',
    location: 'Tampa, FL',
    photo: null,
    summary:
      'Installed motorized divider curtains and volleyball systems across three recreation center courts for flexible multi-use scheduling.',
    testimonial: null,
  },
  {
    id: 'p5',
    name: 'Pasco County — Bleacher & Wall Pad Upgrade',
    industry: 'Government',
    productType: 'Bleachers',
    location: 'Pasco County, FL',
    photo: null,
    summary:
      'Replaced aging telescoping bleachers and refreshed protective wall padding across county recreation facilities.',
    testimonial: null,
  },
  {
    id: 'p6',
    name: 'Orange County Convention Center — Airwall Restoration',
    industry: 'Commercial',
    productType: 'Operable Partitions',
    location: 'Orlando, FL',
    photo: null,
    summary:
      "Large-scale operable wall renovation across the convention center's divisible exhibit halls, restoring seals and trolley systems to factory spec.",
    testimonial: null,
  },
];

// Real PSI team — from psicrew.com/about-us/
export const team: TeamMember[] = [
  { id: 't1', name: 'Jeremy DesHotels', role: 'President', region: 'Company Leadership', phone: '(800) 330-1200', email: 'info@psicrew.com' },
  { id: 't2', name: 'Beau DesHotels', role: 'Vice President, Business Development', region: 'Company Leadership', phone: '(800) 330-1200', email: 'info@psicrew.com' },
  { id: 't3', name: 'Christen DesHotels', role: 'Vice President, Operations', region: 'Company Leadership', phone: '(800) 330-1200', email: 'info@psicrew.com' },
  { id: 't4', name: 'Chris Tuttin', role: 'Project Manager', region: 'Project Management', phone: '(800) 330-1200', email: 'info@psicrew.com' },
  { id: 't5', name: 'Brian Hartman', role: 'National Sales Manager', region: 'Sales', phone: '(800) 330-1200', email: 'info@psicrew.com' },
  { id: 't6', name: 'Joe Vallely', role: 'Project Coordinator', region: 'Project Management', phone: '(800) 330-1200', email: 'info@psicrew.com' },
  { id: 't7', name: 'W.P. Rader', role: 'Accounts Manager', region: 'Accounts', phone: '(800) 330-1200', email: 'info@psicrew.com' },
  { id: 't8', name: 'Alina Allen', role: 'Scheduling Coordinator', region: 'Scheduling', phone: '(800) 330-1200', email: 'info@psicrew.com' },
  { id: 't9', name: 'Susan Fry', role: 'Accounting Specialist', region: 'Accounts', phone: '(800) 330-1200', email: 'info@psicrew.com' },
  { id: 't10', name: 'Casey Hartman', role: 'Project Estimator', region: 'Project Management', phone: '(800) 330-1200', email: 'info@psicrew.com' },
  { id: 't11', name: 'Pieter Boss', role: 'Field Supervisor', region: 'Installation', phone: '(800) 330-1200', email: 'info@psicrew.com' },
  { id: 't12', name: 'Terrence Morris', role: 'Superintendent', region: 'Installation', phone: '(800) 330-1200', email: 'info@psicrew.com' },
  { id: 't13', name: 'Landon DesHotels', role: 'Service Technician', region: 'Service', phone: '(800) 330-1200', email: 'info@psicrew.com' },
  { id: 't14', name: 'Delano Daugherty', role: 'Service Technician', region: 'Service', phone: '(800) 330-1200', email: 'info@psicrew.com' },
  { id: 't15', name: 'Dan Hart', role: 'Service Technician', region: 'Service', phone: '(800) 330-1200', email: 'info@psicrew.com' },
  { id: 't16', name: 'Joshua Taylor', role: 'Service Technician', region: 'Service', phone: '(800) 330-1200', email: 'info@psicrew.com' },
  { id: 't17', name: 'Elijah Willette', role: 'Service Technician', region: 'Service', phone: '(800) 330-1200', email: 'info@psicrew.com' },
  { id: 't18', name: 'Bryce Woodward', role: 'Service Technician', region: 'Service', phone: '(800) 330-1200', email: 'info@psicrew.com' },
  { id: 't19', name: 'Nathan Walbridge', role: 'Service Technician', region: 'Service', phone: '(800) 330-1200', email: 'info@psicrew.com' },
];

export const initialThreads: Thread[] = [
  {
    id: 'th1',
    subject: 'Vinoy Resort — track alignment follow-up',
    withName: 'Chris Tuttin',
    unread: true,
    date: 'Jul 24',
    messages: [
      { from: 'them', text: "Following up on last week's inspection — the west track panel is tracking a little rough. Want me to send a technician out?", time: 'Jul 22, 2:14 PM' },
      { from: 'me', text: 'Yes please, mornings work best for our events team.', time: 'Jul 22, 4:02 PM' },
      { from: 'them', text: "Got it, I'll get someone on the schedule and send confirmation once it's booked.", time: 'Jul 24, 9:20 AM' },
    ],
  },
  {
    id: 'th2',
    subject: 'Quote #Q-2216 — Gym equipment, 4 schools',
    withName: 'Casey Hartman',
    unread: false,
    date: 'Jul 19',
    messages: [
      { from: 'me', text: 'Can we get the updated pricing to include the wall pad upgrade at Freedom Middle?', time: 'Jul 18, 11:03 AM' },
      { from: 'them', text: "Revised quote is attached to the request — added line 4. Let me know if the board needs anything else for approval.", time: 'Jul 19, 1:47 PM' },
    ],
  },
  {
    id: 'th3',
    subject: 'New install kickoff — YMCA divider curtains',
    withName: 'Joe Vallely',
    unread: false,
    date: 'Jul 10',
    messages: [
      { from: 'them', text: "Contracts are signed on our end — we'll have a crew scheduled within 2 weeks of go-ahead.", time: 'Jul 10, 8:30 AM' },
      { from: 'me', text: "Sounds good, I'll loop in our facilities director.", time: 'Jul 10, 10:12 AM' },
    ],
  },
];

export const initialAppointments: Appointment[] = [
  { id: 'a1', type: 'Service Call', product: 'Operable Partition — track alignment', location: 'Vinoy Resort, St. Petersburg', date: 'Aug 4, 2026', time: '8:00 AM – 10:00 AM', status: 'Confirmed' },
  { id: 'a2', type: 'Quote Site Visit', product: 'Basketball backstop assessment', location: 'Freedom Middle School', date: 'Aug 11, 2026', time: '1:00 PM – 2:00 PM', status: 'Pending' },
];

export const history: HistoryEntry[] = [
  { id: 'h1', date: 'Jun 2, 2026', type: 'Service Call', description: 'Annual partition track lubrication & seal check', location: 'Vinoy Resort', status: 'Completed' },
  { id: 'h2', date: 'Apr 14, 2026', type: 'Installation', description: 'Gymnasium equipment upgrade, 4 schools', location: 'Hillsborough County Schools', status: 'Completed' },
  { id: 'h3', date: 'Feb 27, 2026', type: 'Quote', description: 'Volleyball system replacement, 3 courts', location: 'YMCA Suncoast & Tampa', status: 'Won' },
  { id: 'h4', date: 'Jan 9, 2026', type: 'Service Call', description: 'Emergency panel realignment after storm damage', location: 'Vinoy Resort', status: 'Completed' },
];

export const services: Service[] = [
  { id: 's1', name: 'Emergency Repairs & Service', photo: '/assets/services/s1.png',
    blurb: "When downtime isn't an option, PSI responds — 24 hours a day, 365 days a year, for every movable wall system: airwalls, folding partitions, room dividers, and flat panels, regardless of manufacturer.",
    tagline: "When downtime isn't an option, PSI responds.",
    paras: [
      'Equipment failures never pick a convenient time. An operable wall that won\'t open before a conference, a gym divider stuck during school hours, a bleacher that fails inspection minutes before an event — every minute of downtime costs you operation, reputation, and revenue.',
      'Our technicians arrive prepared to diagnose fast, fix what can be fixed on the spot, and restore safe operation with minimal disruption. From broken tracks, worn rollers, and damaged seals to failed motors and impact damage, we find the root cause and make the correct repair — not a temporary patch.',
      "To help us respond even faster, have the manufacturer, model, and system age handy if you know them — and photos of the problem area help enormously. Not sure of any of that? Don't worry: our service team can usually identify a system from a few photos or a short conversation.",
    ],
    bullets: ['Operable & movable wall systems, airwalls, accordion partitions', 'Gymnasium equipment — backstops, volleyball, bleachers', 'Stage curtains, rigging, security grilles, scoreboards', '24/7 hotline: (800) 330-1200'] },
  { id: 's2', name: 'Wallcovering & Installation', photo: '/assets/services/s2.png',
    blurb: 'Restore the appearance, preserve the investment. Panel recovering, refinishing, and premium wallcovering installs — factory-quality results at a fraction of replacement cost.',
    tagline: 'Restore the appearance. Preserve the investment.',
    paras: [
      'Years of daily use leave partition vinyl, fabric, and wallcoverings worn, stained, or dated — but a full wall replacement is usually unnecessary. PSI professionally recovers operable partition panels, restoring their appearance and extending system life at a fraction of replacement cost.',
      'Recovering a movable wall is far more than applying new material: existing finishes are carefully removed, surfaces prepped, damaged substrates replaced, trim and edge components reinstalled, and manufacturer-approved adhesives applied — with panels suspended in operating position for perfect alignment and factory-quality seams.',
      'With 40+ years of specialized wallcovering expertise, we perform every recovery with our own technicians — never subcontractors. Improper recoveries can compromise acoustics, air quality, and even panel integrity; ours are built to look exceptional and perform for years.',
    ],
    bullets: ['Detailed condition inspection & report', 'Rust remediation and adhesive abatement', 'Single-panel repairs to full-scale renovations'] },
  { id: 's3', name: 'Preventive Maintenance', photo: '/assets/services/s3.png',
    blurb: 'Tailored programs covering panel surfaces, track, trolleys, and acoustical seals — quarterly to annual schedules that extend system life and catch small issues before they cancel an event.',
    tagline: 'Protect your investment. Preserve performance.',
    paras: [
      'Your operable partitions are hard-working mechanical systems. Daily conversions, heavy event schedules, and imperfect operation wear tracks, rollers, seals, and hardware — and without routine care, small issues turn into costly repairs and days of downtime.',
      "PSI's Preventive Maintenance Program is tailored to each facility: thorough inspections, adjustments, and servicing of panel surfaces, track, trolley systems, and acoustical seals, on a quarterly, semi-annual, or annual schedule matched to how hard your system works.",
      "Our dedicated Scheduling Coordinator works around your operational calendar — slower seasons, gaps between events — so maintenance happens with minimal disruption. Preferred windows book months ahead, so early scheduling pays.",
    ],
    bullets: ['Maintenance schedules built around your facility', 'Clear, detailed condition reports with expert insight', 'Priority response if service is ever needed', 'Extended system life, dependable day-to-day operation'] },
  { id: 's4', name: 'Renovation / Refurbishing', photo: '/assets/services/s4.png',
    blurb: 'Before you replace, consider what can be renewed. Troubleshooting, hardware replacement, and refinishing routinely bring walls back to like-new condition — often saving thousands.',
    tagline: 'Before you replace… consider what can be renewed.',
    paras: [
      'Many systems keep operating reliably long after their appearance shows age. A well-planned renovation restores aesthetics, improves function, and extends the life of your investment — without the cost and disruption of full replacement.',
      'Every project starts with a comprehensive evaluation: panel construction, track alignment, rollers, acoustic seals, hardware, wallcoverings, and overall performance. If refurbishment is the right answer, we build a customized plan; if replacement truly is the better investment, we\'ll tell you why.',
      'Renovations are planned around your schedule — occupied hotels, working schools, busy convention centers — and our support continues after completion with training, maintenance recommendations, and responsive service.',
    ],
    bullets: ['Extend equipment life, delay capital replacement', 'Renewed seals & alignment restore acoustics', "Modernized finishes to today's design standards", 'Less disruption than replacement'] },
  { id: 's5', name: 'Acoustic Inspection', photo: '/assets/services/s5.png',
    blurb: 'Sound control is the whole point of an operable wall. Our technicians inspect, adjust, and verify acoustical performance so your partitions separate rooms the way they were designed to.',
    tagline: 'Your partitions should sound as good as they look.',
    paras: [
      "Acoustical performance is critical to any operable wall — a partition that leaks sound fails at its one job. PSI's experienced technicians provide comprehensive acoustic inspections to verify your partitions perform as designed.",
      "Whether you're troubleshooting sound transfer, verifying system performance, or evaluating an existing installation, we deliver knowledgeable assessments and practical recommendations to improve acoustical separation — from boardrooms and classrooms to convention centers and banquet facilities.",
    ],
    bullets: ['Sound-transfer troubleshooting', 'Seal, alignment & closure verification', 'Practical, prioritized recommendations'] },
  { id: 's6', name: 'PSI Installation Team', photo: '/assets/services/s6.png',
    blurb: 'Factory-trained, in-house installers — never subcontractors — with thousands of completed projects across schools, hotels, convention centers, and public venues.',
    tagline: 'Exceptional installations begin with exceptional people.',
    paras: [
      'Our factory-trained installation professionals bring decades of combined expertise to every project — precision craftsmanship, uncompromising safety, and real attention to detail.',
      "Unlike companies that lean on subcontractors, PSI's dedicated in-house team owns quality from project start to final inspection. From schools and universities to hotels, convention centers, and public venues, our certified installers have completed thousands of projects of every size and complexity.",
    ],
    bullets: ['100% in-house, factory-trained crews', 'Thousands of completed installations', 'Built to perform, built to last'] },
  { id: 's7', name: 'Operable Wall Remediation', photo: '/assets/services/s7.png',
    blurb: 'When performance declines, we restore systems to peak condition — diagnostics, precision repairs, and restoration for Hufcor, Modernfold, Kwik-Wall, and virtually every major manufacturer.',
    tagline: 'Proven remediation. Peak condition restored.',
    paras: [
      "When a system's performance declines, PSI delivers proven remediation: expert diagnostics, precision repairs, panel recovering, hardware replacement, and complete restoration — for systems from all major manufacturers.",
      "Every project begins with a comprehensive inspection to find the root cause and the most cost-effective fix. And with one of the industry's largest replacement-parts inventories, many repairs are completed quickly — minimizing downtime and avoiding costly replacement.",
    ],
    bullets: ['Hufcor · Modernfold · Kwik-Wall · Panelfold · Moderco', 'IAC · Woodfold · Corflex · Dynamic Closures', 'Richard Wilcox · EMCO · Advanced Equipment — and more'] },
  { id: 's8', name: 'Design & Consultation', photo: '/assets/services/s8.png',
    blurb: 'Our in-house design team partners with architects, contractors, and owners from product selection and field verification through technical planning — every project starts on a solid foundation.',
    tagline: 'Every successful project begins with thoughtful planning.',
    paras: [
      "PSI's in-house Design & Consultation team works closely with architects, contractors, facility managers, and owners to develop practical solutions that meet each project's functional, aesthetic, and budget goals — from product selection and field verification to technical guidance and project planning.",
      'Behind every project is our dedicated Contract Administration team overseeing documentation, scheduling, submittals, and communication start to finish — a transparent, organized process that keeps projects moving and minimizes delays.',
    ],
    bullets: ['Early-stage design consultation', 'Technical specifications & planning', 'Tailored product recommendations'] },
  { id: 's9', name: 'Industry-Leading Parts Inventory', photo: '/assets/services/s9.png',
    blurb: "One of the industry's largest stocks of parts and hardware for virtually every manufacturer — and every service van carries common rollers, seals, hinges, and carriers so most fixes happen on the first visit.",
    tagline: 'The right part, already on the truck.',
    paras: [
      "PSI maintains one of the industry's most comprehensive inventories of replacement parts, hardware, and operating components for operable wall systems — genuine and compatible parts for virtually every major manufacturer, so repairs aren't held hostage by special ordering.",
      'Every PSI service vehicle is strategically stocked with commonly used rollers, seals, hinges, carriers, and specialty components. Our technicians arrive prepared to resolve most issues on the initial visit — fewer return trips, lower repair costs, faster return to service.',
    ],
    bullets: ['Warehouse stock for virtually every manufacturer', 'Stocked service vans — most fixes on first visit', 'Legacy systems no longer factory-supported'] },
  { id: 's10', name: 'In-House Project Management', photo: '/assets/services/s10.png',
    blurb: 'A single point of accountability from kickoff to completion — scheduling, materials, logistics, field operations, and quality control managed by PSI\'s own project managers.',
    tagline: 'One point of accountability, kickoff to completion.',
    paras: [
      "Every PSI project is run by our experienced in-house Project Management Team — coordinating scheduling, materials, logistics, field operations, quality control, and client communication so every installation lands on time, on budget, and to the highest standard.",
      'Unlike companies that outsource project management, PSI professionals oversee every phase with precision and transparency — resolving challenges proactively and delivering the seamless experience architects, contractors, and owners have trusted for decades.',
    ],
    bullets: ['Single point of contact', 'Schedule, budget & quality ownership', 'Proactive problem resolution'] },
  { id: 's11', name: 'Playground Safety Inspections', photo: '/assets/services/s11.png',
    blurb: 'Certified inspectors evaluate equipment, surfacing, and the play environment for schools, parks, and municipalities — with detailed written reports that reduce liability and protect kids.',
    tagline: 'Protecting children — and the facilities that serve them.',
    paras: [
      'PSI provides comprehensive playground safety inspections for schools, parks, municipalities, churches, and recreational facilities. Certified inspectors evaluate equipment, protective surfacing, structural components, and the overall play environment against recognized safety standards.',
      'Programs are customized to equipment age, usage, and site conditions. After every inspection you receive a detailed written report — observations, corrective actions, maintenance priorities — the documentation you need for a safe, compliant, well-managed playground.',
    ],
    bullets: ['Certified playground inspectors', 'Hazard identification & standards compliance', 'Detailed written reports & action plans'] },
  { id: 's12', name: 'Architect & Contractor Collaboration', photo: '/assets/services/s12.png',
    blurb: 'Responsive coordination with architects, GCs, and construction managers from earliest planning through completion — specs met, schedules kept, stakeholders informed.',
    tagline: 'Strong partnerships build successful projects.',
    paras: [
      "PSI's National Sales Team and in-house Contract Administration professionals work closely with architects, general contractors, construction managers, and design professionals from the earliest planning stages through project completion.",
      'Responsive communication, technical expertise, product guidance, and detailed coordination keep specifications met, schedules on track, and every stakeholder informed — whether the job is new construction, renovation, or a specialty installation.',
    ],
    bullets: ['Spec & submittal support', 'Responsive technical guidance', 'New construction, renovation & specialty installs'] },
];

export const equipment: Equipment[] = [
  { id: 'e1', name: 'Hufcor 600 Series — Grand Ballroom', type: 'Operable Partition', panels: '14 panels · 68 STC', lastService: 'Jun 2, 2026', status: 'Good', due: 'Dec 2026' },
  { id: 'e2', name: 'Hufcor 632 — Meeting Rooms 1–4', type: 'Operable Partition', panels: '8 panels · 56 STC', lastService: 'Jun 2, 2026', status: 'Service due', due: 'Overdue — track wear noted' },
  { id: 'e3', name: 'Accordion Partition — Terrace Room', type: 'Accordion Partition', panels: 'Single run · vinyl', lastService: 'Jan 9, 2026', status: 'Good', due: 'Jan 2027' },
];

export const initialOpenQuotes: OpenQuote[] = [
  { id: 'Q-2231', title: 'Terrace Room partition recovering', submitted: 'Jul 21, 2026', status: 'Site visit scheduled', statusKind: 'active', approvable: false,
    contact: 'Casey Hartman, Project Estimator', validThru: '—',
    note: 'Pricing pending site visit on Aug 11 — measurements and fabric selection will finalize the quote.',
    lines: [
      { desc: 'Site visit & field measurement', amount: 'Included' },
      { desc: 'Panel recovering — Terrace Room accordion run', amount: 'TBD' },
    ], total: 'Pending site visit' },
  { id: 'Q-2216', title: 'Grand Ballroom acoustic seal replacement', submitted: 'Jul 8, 2026', status: 'Revised quote sent', statusKind: 'action', approvable: true,
    contact: 'Casey Hartman, Project Estimator', validThru: 'Aug 22, 2026',
    note: "Revision 2 — added guardrail line per your Jul 18 request. Work can be scheduled within 2 weeks of approval.",
    lines: [
      { desc: 'Acoustic sweep seal replacement — 14 panels (Hufcor 600)', amount: '$8,400' },
      { desc: 'Track inspection & trolley adjustment', amount: '$1,150' },
      { desc: 'Panel edge trim repair — panels 3, 7', amount: '$620' },
      { desc: 'Guardrail upgrade — service corridor', amount: '$980' },
    ], total: '$11,150' },
];

export const invoices: Invoice[] = [
  { id: 'INV-3092', title: 'Service call — track alignment', date: 'Jul 25, 2026', due: 'Aug 24, 2026', amount: '$485.00', status: 'Due', ref: 'SC-4188',
    lines: [ { desc: 'Diagnostic & track realignment — 2 hrs labor', amount: '$380.00' }, { desc: 'Trolley hardware', amount: '$105.00' } ] },
  { id: 'INV-3041', title: 'Annual preventive maintenance', date: 'Jun 2, 2026', due: 'Jul 2, 2026', amount: '$1,850.00', status: 'Paid', paidOn: 'Jun 18, 2026', method: 'ACH •••2841', ref: 'PM-2026-VR',
    lines: [ { desc: 'PM program — Grand Ballroom (14 panels)', amount: '$1,250.00' }, { desc: 'PM program — Meeting Rooms 1–4 (8 panels)', amount: '$600.00' } ] },
  { id: 'INV-2967', title: 'Emergency panel realignment', date: 'Jan 9, 2026', due: 'Feb 8, 2026', amount: '$920.00', status: 'Paid', paidOn: 'Jan 22, 2026', method: 'Check #10442', ref: 'SC-3901',
    lines: [ { desc: 'Emergency call-out — after-hours', amount: '$450.00' }, { desc: 'Panel realignment & seal check — 2 panels', amount: '$470.00' } ] },
];

export const clientLogos: ClientLogo[] = [
  { name: 'Marriott Hotels & Resorts', src: 'https://psicrew.com/wp-content/uploads/2026/06/PSI-Logo-Client-Marriott-Hotels-Resorts-300x155.png' },
  { name: 'Hilton Hotels & Resorts', src: 'https://psicrew.com/wp-content/uploads/2026/06/PSI-Logo-Client-Hilton-Hotels-Resorts-300x208.png' },
  { name: 'Ritz Carlton Resorts', src: 'https://psicrew.com/wp-content/uploads/2026/06/PSI-Logo-Client-Ritz-Carlton-Resorts-300x248.png' },
  { name: 'Hyatt Hotels', src: 'https://psicrew.com/wp-content/uploads/2026/06/Hyatt-Hotels-Logo-Vector-300x71.png' },
  { name: 'Westin Hotels & Resorts', src: 'https://psicrew.com/wp-content/uploads/2026/06/PSI-Logo-Client-Westin-Hotels-Resorts-300x112.png' },
  { name: 'Four Seasons', src: 'https://psicrew.com/wp-content/uploads/2026/06/Four-Seasons-Logo-300x169.png' },
  { name: 'Orange County Convention Center', src: 'https://psicrew.com/wp-content/uploads/2026/06/PSI-Logo-Client-Orange-County-Convention-Center.png' },
  { name: 'Universal Orlando Resort', src: 'https://psicrew.com/wp-content/uploads/2026/06/New_Universal_Orlando_Resort_Logo-300x164.png' },
  { name: 'YMCA Suncoast & Tampa', src: 'https://psicrew.com/wp-content/uploads/2026/06/PSI-Logo-Client-YMCA-Suncoast-Tampa-300x229.png' },
  { name: 'University of South Florida', src: 'https://psicrew.com/wp-content/uploads/2026/06/PSI-Logo-Client-University-Of-South-Florida-300x80.png' },
];

export const heroPhoto = 'https://psicrew.com/wp-content/uploads/2026/06/PSI-PRODUCTS-HUFCOR-Vinoy-Resort-St-Petersburg-FL.jpg';
