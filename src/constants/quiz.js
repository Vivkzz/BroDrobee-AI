export const QUIZ_STEPS = [
  {
    title: "What's your gender?",
    field: "gender",
    type: "single",
    options: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
      { value: "non-binary", label: "Non-binary" },
      { value: "prefer-not-to-say", label: "Prefer not to say" }
    ]
  },
  {
    title: "What's your occupation?",
    field: "occupation",
    type: "single",
    options: [
      {
        value: "student",
        label: "Student",
        subcategories: [
          { value: "high-school", label: "High School" },
          { value: "undergraduate", label: "Undergraduate" },
          { value: "graduate", label: "Graduate" },
          { value: "phd", label: "PhD" }
        ]
      },
      {
        value: "office-worker",
        label: "Office Worker",
        subcategories: [
          { value: "it-tech", label: "IT/Tech" },
          { value: "finance", label: "Finance/Banking" },
          { value: "marketing", label: "Marketing" },
          { value: "hr", label: "Human Resources" },
          { value: "admin", label: "Administration" },
          { value: "sales", label: "Sales" },
          { value: "customer-service", label: "Customer Service" }
        ]
      },
      {
        value: "factory-worker",
        label: "Factory Worker",
        subcategories: [
          { value: "manufacturing", label: "Manufacturing" },
          { value: "assembly", label: "Assembly Line" },
          { value: "quality-control", label: "Quality Control" },
          { value: "warehouse", label: "Warehouse" },
          { value: "logistics", label: "Logistics" }
        ]
      },
      {
        value: "business",
        label: "Business/Entrepreneur",
        subcategories: [
          { value: "retail", label: "Retail Business" },
          { value: "restaurant", label: "Restaurant/Food Service" },
          { value: "consulting", label: "Consulting" },
          { value: "real-estate", label: "Real Estate" },
          { value: "ecommerce", label: "E-commerce" },
          { value: "startup", label: "Startup" }
        ]
      },
      {
        value: "creative",
        label: "Creative/Arts",
        subcategories: [
          { value: "design", label: "Design" },
          { value: "music", label: "Music" },
          { value: "writing", label: "Writing/Content" },
          { value: "photography", label: "Photography" },
          { value: "fashion", label: "Fashion" },
          { value: "art", label: "Fine Arts" }
        ]
      },
      {
        value: "healthcare",
        label: "Healthcare",
        subcategories: [
          { value: "doctor", label: "Doctor" },
          { value: "nurse", label: "Nurse" },
          { value: "therapist", label: "Therapist" },
          { value: "pharmacy", label: "Pharmacy" },
          { value: "fitness", label: "Fitness/Wellness" }
        ]
      },
      {
        value: "education",
        label: "Education",
        subcategories: [
          { value: "teacher", label: "Teacher" },
          { value: "professor", label: "Professor" },
          { value: "trainer", label: "Trainer" },
          { value: "counselor", label: "Counselor" }
        ]
      },
      {
        value: "service",
        label: "Service Industry",
        subcategories: [
          { value: "hospitality", label: "Hospitality" },
          { value: "food-service", label: "Food Service" },
          { value: "retail-service", label: "Retail Service" },
          { value: "beauty", label: "Beauty/Spa" }
        ]
      },
      {
        value: "other",
        label: "Other",
        subcategories: [
          { value: "government", label: "Government" },
          { value: "non-profit", label: "Non-profit" },
          { value: "freelance", label: "Freelance" },
          { value: "unemployed", label: "Unemployed" },
          { value: "retired", label: "Retired" }
        ]
      }
    ]
  },
  {
    title: "What's your skin tone?",
    field: "skinTone",
    type: "single",
    options: [
      { value: "fair", label: "Fair", color: "#F8D5C2" },
      { value: "light", label: "Light", color: "#F3C099" },
      { value: "medium", label: "Medium", color: "#E8B170" },
      { value: "olive", label: "Olive", color: "#C99F67" },
      { value: "tan", label: "Tan", color: "#BB8A52" },
      { value: "deep", label: "Deep", color: "#896A45" },
      { value: "dark", label: "Dark", color: "#6A4F33" },
      { value: "deep-dark", label: "Deep Dark", color: "#4A3520" },
    ]
  },
  {
    title: "What's your undertone?",
    field: "undertone",
    type: "single",
    options: [
      { value: "cool", label: "Cool (blue/pink undertones)" },
      { value: "warm", label: "Warm (yellow/golden undertones)" },
      { value: "neutral", label: "Neutral (mix of cool and warm)" },
      { value: "olive", label: "Olive (greenish undertones)" },
    ]
  },
  {
    title: "What's your style preference?",
    field: "stylePreferences",
    type: "multi",
    options: [
      { value: "casual", label: "Casual" },
      { value: "formal", label: "Formal" },
      { value: "streetwear", label: "Streetwear" },
      { value: "vintage", label: "Vintage" },
      { value: "minimalist", label: "Minimalist" },
      { value: "bohemian", label: "Bohemian" },
      { value: "preppy", label: "Preppy" },
      { value: "athleisure", label: "Athleisure" },
    ]
  },
  {
    title: "What occasions do you dress for most often?",
    field: "occasionPreferences",
    type: "multi",
    options: [
      { value: "work", label: "Work/Office" },
      { value: "casual-outings", label: "Casual Outings" },
      { value: "formal-events", label: "Formal Events" },
      { value: "dates", label: "Dates" },
      { value: "parties", label: "Parties" },
      { value: "outdoor-activities", label: "Outdoor Activities" },
      { value: "exercise", label: "Exercise" },
    ]
  },
  {
    title: "What colors do you like to wear?",
    field: "colorPreferences",
    type: "multi",
    options: [
      { value: "black", label: "Black", color: "#000000" },
      { value: "white", label: "White", color: "#FFFFFF" },
      { value: "gray", label: "Gray", color: "#808080" },
      { value: "navy", label: "Navy", color: "#000080" },
      { value: "blue", label: "Blue", color: "#0000FF" },
      { value: "green", label: "Green", color: "#008000" },
      { value: "red", label: "Red", color: "#FF0000" },
      { value: "yellow", label: "Yellow", color: "#FFFF00" },
      { value: "purple", label: "Purple", color: "#800080" },
      { value: "pink", label: "Pink", color: "#FFC0CB" },
      { value: "orange", label: "Orange", color: "#FFA500" },
      { value: "brown", label: "Brown", color: "#A52A2A" },
    ]
  },
  {
    title: "Upload a selfie (optional)",
    field: "selfieUrl",
    type: "file",
  }
]; 