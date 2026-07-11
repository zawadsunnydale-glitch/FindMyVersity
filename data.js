/* ============================================================
   FindMyVersity — mock data layer (v2, expanded)
   Figures are illustrative placeholders curated for realism,
   not a live feed. Swap in a real data source / API for production.
============================================================ */

/* ---------- Global universities ---------- */
const UNIVERSITIES = [
  // ---- USA ----
  { id:"mit", name:"Massachusetts Institute of Technology", country:"United States", city:"Cambridge, MA", tuition:59750, living:21000, qs:1, the:2, usnews:2, arwu:3, employer:99, fields:["computer-science","engineering","ai-ml","physics"], scholarship:"Need-blind, up to 100%", tags:["STEM powerhouse","Need-blind aid"] },
  { id:"stanford", name:"Stanford University", country:"United States", city:"Stanford, CA", tuition:62400, living:24000, qs:5, the:3, usnews:4, arwu:2, employer:98, fields:["computer-science","ai-ml","business","engineering"], scholarship:"Stanford Financial Aid", tags:["Silicon Valley access","Entrepreneurship"] },
  { id:"harvard", name:"Harvard University", country:"United States", city:"Cambridge, MA", tuition:56550, living:22000, qs:4, the:4, usnews:3, arwu:1, employer:99, fields:["law","medicine","economics","business"], scholarship:"Need-based, no loans", tags:["Global brand","Deep endowment"] },
  { id:"cmu", name:"Carnegie Mellon University", country:"United States", city:"Pittsburgh, PA", tuition:60500, living:18500, qs:52, the:22, usnews:24, arwu:47, employer:95, fields:["computer-science","ai-ml","engineering"], scholarship:"Dean's Scholarship", tags:["Top-3 world CS","Robotics hub"] },
  { id:"umich", name:"University of Michigan, Ann Arbor", country:"United States", city:"Ann Arbor, MI", tuition:53200, living:16500, qs:44, the:33, usnews:21, arwu:23, employer:92, fields:["engineering","business","medicine"], scholarship:"Go Blue Guarantee", tags:["Big public flagship","Strong alumni network"] },

  // ---- United Kingdom ----
  { id:"oxford", name:"University of Oxford", country:"United Kingdom", city:"Oxford", tuition:41000, living:15500, qs:3, the:1, usnews:5, arwu:7, employer:97, fields:["law","medicine","economics","ai-ml"], scholarship:"Rhodes & Reach Oxford", tags:["Tutorial system","Ancient colleges"] },
  { id:"cambridge", name:"University of Cambridge", country:"United Kingdom", city:"Cambridge", tuition:40500, living:15000, qs:2, the:5, usnews:6, arwu:4, employer:96, fields:["engineering","physics","medicine","ai-ml"], scholarship:"Cambridge Trust", tags:["Supervision system","Deep research base"] },
  { id:"imperial", name:"Imperial College London", country:"United Kingdom", city:"London", tuition:38000, living:16500, qs:2, the:9, usnews:20, arwu:24, employer:94, fields:["engineering","ai-ml","medicine","physics"], scholarship:"President's Scholarship", tags:["STEM-only focus","Central London"] },
  { id:"lse", name:"London School of Economics", country:"United Kingdom", city:"London", tuition:26208, living:17000, qs:45, the:37, usnews:80, arwu:151, employer:91, fields:["economics","law","business"], scholarship:"LSE Undergraduate Support", tags:["Social science elite","Global finance pipeline"] },
  { id:"ucl", name:"University College London", country:"United Kingdom", city:"London", tuition:33500, living:17000, qs:9, the:22, usnews:18, arwu:17, employer:93, fields:["engineering","medicine","arts","ai-ml"], scholarship:"UCL Global Undergraduate", tags:["Broadest faculty range","Central London"] },

  // ---- Germany ----
  { id:"tum", name:"Technical University of Munich", country:"Germany", city:"Munich", tuition:0, living:13500, qs:28, the:30, usnews:44, arwu:51, employer:90, fields:["engineering","computer-science","physics"], scholarship:"Deutschlandstipendium", tags:["No tuition fee","Industry-linked"] },
  { id:"lmu", name:"LMU Munich", country:"Germany", city:"Munich", tuition:0, living:13500, qs:59, the:36, usnews:65, arwu:47, employer:87, fields:["medicine","law","economics"], scholarship:"DAAD Scholarships", tags:["No tuition fee","Research heavyweight"] },
  { id:"rwth", name:"RWTH Aachen University", country:"Germany", city:"Aachen", tuition:0, living:11500, qs:106, the:114, usnews:130, arwu:151, employer:86, fields:["engineering","computer-science"], scholarship:"DAAD Scholarships", tags:["No tuition fee","Engineering-focused"] },
  { id:"kit", name:"Karlsruhe Institute of Technology", country:"Germany", city:"Karlsruhe", tuition:0, living:11000, qs:141, the:88, usnews:130, arwu:96, employer:83, fields:["engineering","computer-science","physics"], scholarship:"DAAD Scholarships", tags:["No tuition fee","Applied research"] },

  // ---- Hong Kong ----
  { id:"hku", name:"University of Hong Kong", country:"Hong Kong", city:"Hong Kong", tuition:22000, living:12500, qs:17, the:35, usnews:40, arwu:58, employer:88, fields:["business","law","medicine"], scholarship:"HKU Foundation", tags:["Finance hub access","Bilingual campus"] },
  { id:"hkust", name:"HKUST", country:"Hong Kong", city:"Hong Kong", tuition:20800, living:12000, qs:47, the:60, usnews:74, arwu:89, employer:85, fields:["engineering","computer-science","business"], scholarship:"HKUST Undergraduate Scholarship", tags:["Young & fast-rising","Strong industry ties"] },
  { id:"cuhk", name:"Chinese University of Hong Kong", country:"Hong Kong", city:"Hong Kong", tuition:20300, living:11500, qs:36, the:53, usnews:78, arwu:101, employer:83, fields:["medicine","business","arts"], scholarship:"CUHK Vice-Chancellor's Award", tags:["Beautiful hillside campus","Broad faculty"] },

  // ---- Singapore ----
  { id:"nus", name:"National University of Singapore", country:"Singapore", city:"Singapore", tuition:29000, living:12000, qs:8, the:19, usnews:26, arwu:68, employer:92, fields:["computer-science","business","engineering"], scholarship:"ASEAN & Merit awards", tags:["Asia's top campus","Strong industry ties"] },
  { id:"ntu", name:"Nanyang Technological University", country:"Singapore", city:"Singapore", tuition:27500, living:11500, qs:15, the:26, usnews:41, arwu:77, employer:88, fields:["engineering","computer-science","business"], scholarship:"NTU Merit Scholarship", tags:["Smart-campus tech","Strong co-op"] },
  { id:"smu", name:"Singapore Management University", country:"Singapore", city:"Singapore", tuition:31000, living:12500, qs:511, the:601, usnews:701, arwu:801, employer:78, fields:["business","law","economics"], scholarship:"SMU Merit Scholarship", tags:["Seminar-style teaching","City-campus"] },

  // ---- Canada ----
  { id:"utoronto", name:"University of Toronto", country:"Canada", city:"Toronto", tuition:45000, living:16000, qs:21, the:18, usnews:15, arwu:21, employer:89, fields:["computer-science","medicine","business"], scholarship:"Lester B. Pearson", tags:["PR pathway","Research heavyweight"] },
  { id:"ubc", name:"University of British Columbia", country:"Canada", city:"Vancouver", tuition:41500, living:16500, qs:34, the:41, usnews:33, arwu:37, employer:85, fields:["engineering","arts","business"], scholarship:"International Major Entrance", tags:["PR pathway","Coastal campus"] },
  { id:"mcgill", name:"McGill University", country:"Canada", city:"Montreal", tuition:32000, living:13500, qs:30, the:44, usnews:38, arwu:62, employer:86, fields:["medicine","arts","business"], scholarship:"Major Entrance Scholarship", tags:["Affordable living","Bilingual city"] },
  { id:"uwaterloo", name:"University of Waterloo", country:"Canada", city:"Waterloo", tuition:38500, living:14000, qs:112, the:201, usnews:191, arwu:201, employer:88, fields:["computer-science","engineering"], scholarship:"President's Scholarship", tags:["Co-op powerhouse","Startup pipeline"] },

  // ---- Japan ----
  { id:"utokyo", name:"University of Tokyo", country:"Japan", city:"Tokyo", tuition:5300, living:14500, qs:32, the:29, usnews:73, arwu:23, employer:84, fields:["engineering","physics","economics"], scholarship:"MEXT Scholarship", tags:["Low tuition","National flagship"] },
  { id:"kyoto", name:"Kyoto University", country:"Japan", city:"Kyoto", tuition:5300, living:12500, qs:44, the:55, usnews:96, arwu:35, employer:80, fields:["physics","medicine","engineering"], scholarship:"MEXT Scholarship", tags:["Low tuition","Nobel-laureate legacy"] },
  { id:"titech", name:"Tokyo Institute of Technology", country:"Japan", city:"Tokyo", tuition:5300, living:14000, qs:91, the:141, usnews:251, arwu:151, employer:76, fields:["engineering","computer-science"], scholarship:"MEXT Scholarship", tags:["Low tuition","Engineering specialist"] },

  // ---- Australia ----
  { id:"unimelb", name:"University of Melbourne", country:"Australia", city:"Melbourne", tuition:34000, living:17500, qs:13, the:16, usnews:22, arwu:34, employer:90, fields:["medicine","business","arts","law"], scholarship:"Melbourne Global Scholars", tags:["Broad curriculum","Post-study work visa"] },
  { id:"anu", name:"Australian National University", country:"Australia", city:"Canberra", tuition:31000, living:15000, qs:34, the:62, usnews:60, arwu:78, employer:82, fields:["economics","arts","physics"], scholarship:"ANU Chancellor's Award", tags:["Policy-focused","Small class sizes"] },
];

/* ---------- Bangladeshi universities: tuition + employer reputation ---------- */
const BD_UNIVERSITIES = [
  { name:"Bangladesh University of Engineering & Technology (BUET)", type:"Public", city:"Dhaka", tuitionPerYearBDT:8000, employer:96, admissionTest:"BUET Admission Test", notes:"Country's top engineering school; extremely competitive." },
  { name:"University of Dhaka", type:"Public", city:"Dhaka", tuitionPerYearBDT:6000, employer:92, admissionTest:"DU Unit-based Test (A/B/C/D)", notes:"Oldest and most prestigious general university." },
  { name:"Institute of Business Administration, DU (IBA)", type:"Public", city:"Dhaka", tuitionPerYearBDT:65000, employer:95, admissionTest:"IBA Admission Test", notes:"Top-ranked business school in the country." },
  { name:"Bangladesh University of Professionals (BUP)", type:"Public", city:"Dhaka", tuitionPerYearBDT:45000, employer:83, admissionTest:"BUP Admission Test", notes:"Growing reputation, defense-affiliated governance." },
  { name:"North South University (NSU)", type:"Private", city:"Dhaka", tuitionPerYearBDT:420000, employer:82, admissionTest:"NSU Admission Test", notes:"Largest private university; strong CSE & BBA placement." },
  { name:"BRAC University", type:"Private", city:"Dhaka", tuitionPerYearBDT:400000, employer:80, admissionTest:"BRACU Admission Test", notes:"Strong CS/architecture reputation, need-based aid available." },
  { name:"Independent University, Bangladesh (IUB)", type:"Private", city:"Dhaka", tuitionPerYearBDT:380000, employer:74, admissionTest:"IUB Admission Test", notes:"Solid business & CS programs, smaller campus feel." },
  { name:"American International University-Bangladesh (AIUB)", type:"Private", city:"Dhaka", tuitionPerYearBDT:300000, employer:70, admissionTest:"AIUB Admission Test", notes:"Large CSE intake, flexible semester system." },
  { name:"Bangladesh University of Textiles (BUTEX)", type:"Public", city:"Dhaka", tuitionPerYearBDT:10000, employer:79, admissionTest:"BUTEX Admission Test", notes:"Specialist textile engineering, strong RMG-sector placement." },
  { name:"Chittagong University of Engineering & Technology (CUET)", type:"Public", city:"Chattogram", tuitionPerYearBDT:9000, employer:85, admissionTest:"CUET Admission Test", notes:"Leading engineering school outside Dhaka." },
  { name:"Khulna University of Engineering & Technology (KUET)", type:"Public", city:"Khulna", tuitionPerYearBDT:9000, employer:83, admissionTest:"KUET Admission Test", notes:"Strong regional engineering reputation." },
  { name:"Shahjalal University of Science & Technology (SUST)", type:"Public", city:"Sylhet", tuitionPerYearBDT:8500, employer:81, admissionTest:"SUST Admission Test", notes:"Known for CSE and a green residential campus." },
];

/* ---------- Living cost baselines by destination (monthly, USD) ---------- */
const LIVING_COST_BASELINE = {
  "United States": { rent:1100, food:450, transport:110, utilities:130, clothes:70, misc:120 },
  "United Kingdom": { rent:950, food:380, transport:120, utilities:140, clothes:60, misc:110 },
  "Germany": { rent:600, food:280, transport:80, utilities:100, clothes:50, misc:90 },
  "Hong Kong": { rent:850, food:420, transport:90, utilities:110, clothes:60, misc:100 },
  "Singapore": { rent:800, food:400, transport:85, utilities:100, clothes:55, misc:100 },
  "Canada": { rent:900, food:380, transport:100, utilities:110, clothes:60, misc:100 },
  "Japan": { rent:650, food:350, transport:70, utilities:110, clothes:55, misc:90 },
  "Australia": { rent:950, food:400, transport:110, utilities:120, clothes:60, misc:110 },
  "Bangladesh": { rent:150, food:120, transport:35, utilities:40, clothes:20, misc:40 },
};

const CAREERS = [
  { id: "ai-ml", label: "AI / ML Engineer", field: "Computer Science", blurb: "Builds and ships machine-learning systems, from research prototypes to production models.", topUnis: ["mit","stanford","cmu","imperial"] },
  { id: "quant", label: "Quant Analyst", field: "Physics / Mathematics", blurb: "Applies statistics and computation to price risk and find edges in financial markets.", topUnis: ["mit","imperial","cmu","anu"] },
  { id: "investment-banker", label: "Investment Banker", field: "Business / Finance", blurb: "Advises on mergers, raises capital, and structures large financial deals.", topUnis: ["oxford","lse","hku","nus"] },
  { id: "surgeon", label: "Surgeon", field: "Medicine", blurb: "Diagnoses and operates to treat injury and disease — a long, exacting clinical path.", topUnis: ["harvard","cambridge","unimelb","utoronto"] },
  { id: "software-engineer", label: "Software Engineer", field: "Computer Science", blurb: "Designs and builds the software that runs everything from apps to infrastructure.", topUnis: ["mit","cmu","ntu","nus"] },
  { id: "civil-engineer", label: "Civil Engineer", field: "Engineering", blurb: "Plans and builds the physical infrastructure that cities depend on.", topUnis: ["tum","imperial","ntu","kit"] },
  { id: "economist", label: "Economist", field: "Economics", blurb: "Studies how markets and policy shape resources, prices, and growth.", topUnis: ["oxford","lse","anu","utokyo"] },
  { id: "corporate-lawyer", label: "Corporate Lawyer", field: "Law", blurb: "Structures contracts and counsels companies through deals, disputes, and compliance.", topUnis: ["oxford","hku","cambridge","utoronto"] },
];

const SUBJECT_REQUIREMENTS = {
  "ai-ml": { hsc:["Physics","Chemistry","Higher Mathematics"], madrasha:["Physics","Higher Mathematics","Chemistry"], alevels:["Mathematics","Further Mathematics","Physics"] },
  "quant": { hsc:["Higher Mathematics","Physics","Chemistry"], madrasha:["Higher Mathematics","Physics"], alevels:["Mathematics","Further Mathematics","Economics"] },
  "investment-banker": { hsc:["Accounting","Business Studies","Higher Mathematics"], madrasha:["Accounting","Business Studies"], alevels:["Mathematics","Economics","Business"] },
  "surgeon": { hsc:["Biology","Chemistry","Physics"], madrasha:["Biology","Chemistry","Physics"], alevels:["Biology","Chemistry","Mathematics"] },
  "software-engineer": { hsc:["Higher Mathematics","Physics","ICT"], madrasha:["Higher Mathematics","Physics"], alevels:["Mathematics","Computer Science","Physics"] },
  "civil-engineer": { hsc:["Higher Mathematics","Physics","Chemistry"], madrasha:["Higher Mathematics","Physics"], alevels:["Mathematics","Physics","Chemistry"] },
  "economist": { hsc:["Higher Mathematics","Economics","Business Studies"], madrasha:["Higher Mathematics","Economics"], alevels:["Mathematics","Economics","Further Mathematics"] },
  "corporate-lawyer": { hsc:["Business Studies","Accounting","Economics"], madrasha:["Business Studies","Economics"], alevels:["Economics","Business","History"] },
};

const ELIGIBILITY_PROGRAMS = [
  { program: "BSc Computer Science", needs: ["Physics", "Higher Mathematics"], stream: "science" },
  { program: "BEng Electrical & Electronic Engineering", needs: ["Physics", "Higher Mathematics", "Chemistry"], stream: "science" },
  { program: "MBBS Medicine", needs: ["Biology", "Chemistry", "Physics"], stream: "science" },
  { program: "BSc Physics", needs: ["Physics", "Higher Mathematics"], stream: "science" },
  { program: "BSc Actuarial Science", needs: ["Higher Mathematics"], stream: "science" },
  { program: "BBA Finance", needs: ["Accounting", "Higher Mathematics"], stream: "commerce" },
  { program: "BSc Economics", needs: ["Accounting", "Business Studies"], stream: "commerce" },
  { program: "BBA Marketing", needs: ["Business Studies"], stream: "commerce" },
  { program: "LLB Law", needs: ["Business Studies", "Accounting"], stream: "commerce" },
  { program: "BA International Relations", needs: [], stream: "arts" },
  { program: "BA Psychology", needs: [], stream: "arts" },
  { program: "BFA Design", needs: [], stream: "arts" },
];

const SUBJECTS_BY_STREAM = {
  science: ["Physics", "Chemistry", "Biology", "Higher Mathematics"],
  commerce: ["Accounting", "Business Studies", "Economics", "Finance"],
  arts: ["History", "Civics", "Sociology", "English Literature"],
};

const VISA_INFO = [
  { country: "USA", visa: "F-1 Student Visa", processing: "3–5 weeks", funds: "$25,000+ proof", steps: ["Receive I-20 from university","Pay SEVIS fee","Complete DS-160","Book & attend embassy interview"] },
  { country: "UK", visa: "Student Route (Tier 4)", processing: "3 weeks", funds: "£12,000+ proof (28-day rule)", steps: ["Get CAS from university","Prove funds for 28 consecutive days","Complete online application","Attend biometrics appointment"] },
  { country: "Canada", visa: "Study Permit", processing: "4–8 weeks", funds: "CA$20,635+ (GIC)", steps: ["Get Letter of Acceptance","Apply online with biometrics","Show proof of funds (GIC)","Medical exam if required"] },
  { country: "Germany", visa: "National Student Visa", processing: "6–12 weeks", funds: "€11,904 blocked account", steps: ["Open blocked account","Book VFS appointment","Submit health insurance proof","Attend visa interview"] },
  { country: "Australia", visa: "Subclass 500", processing: "4–6 weeks", funds: "AU$29,710+ proof", steps: ["Get CoE from university","Write GTE statement","Health & OSHC cover","Lodge online application"] },
  { country: "Singapore", visa: "Student's Pass", processing: "2–4 weeks", funds: "Varies by course", steps: ["Register on SOLAR via institution","Submit eForm 16","Medical examination","Complete formalities on arrival"] },
  { country: "Hong Kong", visa: "Student Visa/Entry Permit", processing: "6–8 weeks", funds: "HK$180,000+ recommended", steps: ["Get unconditional offer","Apply via ImmD online","Provide proof of accommodation","Collect visa label on arrival"] },
  { country: "Japan", visa: "Student Visa (Ryugaku)", processing: "1–3 months", funds: "¥2,000,000+ recommended", steps: ["University applies for Certificate of Eligibility (CoE)","Submit CoE + application to embassy","Provide financial sponsor documents","Attend visa interview if required"] },
];

const RANKING_SETS = { qs:"qs", the:"the", usnews:"usnews", arwu:"arwu" };

const ECA_LIBRARY = {
  broad: [
    "Join or lead a subject-relevant school club (debate, robotics, coding, Model UN)",
    "Volunteer 40+ hours with a local NGO or community project",
    "Take a free online course (Coursera/edX) related to your intended major",
    "Participate in an inter-school or national-level competition",
    "Shadow a professional in your target field for a week",
  ],
  competitive: {
    "computer-science": ["Place at a national Olympiad in Informatics","Build and ship an app with real users","Contribute to an open-source project on GitHub","Win a hackathon or organise one for your school"],
    "engineering": ["Enter a robotics or design competition (FIRST, VEX)","Complete a research project with a university mentor","Prototype a working invention or patent-pending design","Intern at an engineering firm"],
    "medicine": ["Volunteer in a hospital or clinic setting","Complete a certified First Aid / EMT course","Run a public-health awareness project","Shadow a physician and log reflective case notes"],
    "business": ["Launch a small venture or social enterprise","Win a case-competition or business plan contest","Complete a finance/investing certification (CFA Level 1 prep)","Intern at a startup or bank"],
    "law": ["Compete in Model UN or a mock trial competition","Intern at a law firm or NGO legal-aid desk","Publish an op-ed on a policy issue","Captain the school debate team"],
    "arts": ["Curate or exhibit an independent creative portfolio","Win a regional or national arts competition","Publish written work in a literary magazine","Lead a creative project with measurable community impact"],
  },
};

const FIELD_LABELS = {
  "computer-science": "Computer Science",
  "engineering": "Engineering",
  "ai-ml": "AI / Machine Learning",
  "physics": "Physics",
  "law": "Law",
  "medicine": "Medicine",
  "economics": "Economics",
  "business": "Business",
  "arts": "Arts & Humanities",
};

const COUNTRY_LIST = ["United States","United Kingdom","Germany","Hong Kong","Singapore","Canada","Japan","Australia","Bangladesh"];
