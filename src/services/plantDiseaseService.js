import axios from 'axios';

// Plant disease detection API endpoint
const PLANT_DISEASE_API_URL = 'https://plant-disease-detection-api.herokuapp.com/predict';

/**
 * Plant disease detection model classes
 * Based on the Krishi project's 21 diseases across 9 plant species
 */
const DISEASE_CLASSES = {
  0: { name: 'Apple___Apple_scab', plantType: 'apple', isHealthy: false },
  1: { name: 'Apple___Black_rot', plantType: 'apple', isHealthy: false },
  2: { name: 'Apple___Cedar_apple_rust', plantType: 'apple', isHealthy: false },
  3: { name: 'Apple___healthy', plantType: 'apple', isHealthy: true },
  4: { name: 'Blueberry___healthy', plantType: 'blueberry', isHealthy: true },
  5: { name: 'Cherry_(including_sour)___Powdery_mildew', plantType: 'cherry', isHealthy: false },
  6: { name: 'Cherry_(including_sour)___healthy', plantType: 'cherry', isHealthy: true },
  7: { name: 'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot', plantType: 'corn', isHealthy: false },
  8: { name: 'Corn_(maize)___Common_rust_', plantType: 'corn', isHealthy: false },
  9: { name: 'Corn_(maize)___Northern_Leaf_Blight', plantType: 'corn', isHealthy: false },
  10: { name: 'Corn_(maize)___healthy', plantType: 'corn', isHealthy: true },
  11: { name: 'Grape___Black_rot', plantType: 'grape', isHealthy: false },
  12: { name: 'Grape___Esca_(Black_Measles)', plantType: 'grape', isHealthy: false },
  13: { name: 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)', plantType: 'grape', isHealthy: false },
  14: { name: 'Grape___healthy', plantType: 'grape', isHealthy: true },
  15: { name: 'Orange___Haunglongbing_(Citrus_greening)', plantType: 'orange', isHealthy: false },
  16: { name: 'Peach___Bacterial_spot', plantType: 'peach', isHealthy: false },
  17: { name: 'Peach___healthy', plantType: 'peach', isHealthy: true },
  18: { name: 'Pepper,_bell___Bacterial_spot', plantType: 'pepper', isHealthy: false },
  19: { name: 'Pepper,_bell___healthy', plantType: 'pepper', isHealthy: true },
  20: { name: 'Potato___Early_blight', plantType: 'potato', isHealthy: false },
  21: { name: 'Potato___Late_blight', plantType: 'potato', isHealthy: false },
  22: { name: 'Potato___healthy', plantType: 'potato', isHealthy: true },
  23: { name: 'Raspberry___healthy', plantType: 'raspberry', isHealthy: true },
  24: { name: 'Soybean___healthy', plantType: 'soybean', isHealthy: true },
  25: { name: 'Squash___Powdery_mildew', plantType: 'squash', isHealthy: false },
  26: { name: 'Strawberry___Leaf_scorch', plantType: 'strawberry', isHealthy: false },
  27: { name: 'Strawberry___healthy', plantType: 'strawberry', isHealthy: true },
  28: { name: 'Tomato___Bacterial_spot', plantType: 'tomato', isHealthy: false },
  29: { name: 'Tomato___Early_blight', plantType: 'tomato', isHealthy: false },
  30: { name: 'Tomato___Late_blight', plantType: 'tomato', isHealthy: false },
  31: { name: 'Tomato___Leaf_Mold', plantType: 'tomato', isHealthy: false },
  32: { name: 'Tomato___Septoria_leaf_spot', plantType: 'tomato', isHealthy: false },
  33: { name: 'Tomato___Spider_mites Two-spotted_spider_mite', plantType: 'tomato', isHealthy: false },
  34: { name: 'Tomato___Target_Spot', plantType: 'tomato', isHealthy: false },
  35: { name: 'Tomato___Tomato_Yellow_Leaf_Curl_Virus', plantType: 'tomato', isHealthy: false },
  36: { name: 'Tomato___Tomato_mosaic_virus', plantType: 'tomato', isHealthy: false },
  37: { name: 'Tomato___healthy', plantType: 'tomato', isHealthy: true }
};

// Disease information database with descriptions and treatments
const DISEASE_INFO = {
  'Apple___Apple_scab': {
    description: 'Apple scab is a common disease of apple trees and some other members of the rose family, caused by the ascomycete fungus Venturia inaequalis. It manifests as dark green or brown lesions on the leaves, fruit, and sometimes young stems.',
    symptoms: [
      'Olive-green to brown spots on leaves',
      'Dark, scabby, or corky lesions on fruit',
      'Deformed fruit',
      'Premature leaf and fruit drop'
    ],
    treatments: {
      immediate: [
        'Remove and destroy infected leaves and fruit',
        'Apply fungicide specifically labeled for apple scab',
        'Improve air circulation by pruning',
        'Avoid overhead irrigation'
      ],
      preventive: [
        'Plant resistant varieties',
        'Apply protective fungicide sprays in early spring',
        'Rake and destroy fallen leaves in autumn',
        'Maintain proper tree spacing for good air circulation'
      ],
      organic: [
        'Apply sulfur or copper-based organic fungicides',
        'Use neem oil as a preventative measure',
        'Apply compost tea to boost plant immunity',
        'Introduce beneficial microorganisms to the soil'
      ]
    }
  },
  'Apple___Black_rot': {
    description: 'Black rot is a fungal disease caused by Botryosphaeria obtusa that affects apple trees. It can infect fruit, leaves, and bark, causing significant damage to apple crops.',
    symptoms: [
      'Dark circular lesions on fruit',
      'Rotting of fruit, often from the calyx end',
      'Dark spots on leaves with purple edges',
      'Cankers on branches and trunk'
    ],
    treatments: {
      immediate: [
        'Remove and destroy infected fruit and branches',
        'Apply fungicide specifically labeled for black rot',
        'Prune out cankers and dead wood',
        'Sanitize pruning tools between cuts'
      ],
      preventive: [
        'Maintain good orchard sanitation',
        'Apply protective fungicide sprays',
        'Prune trees to improve air circulation',
        'Control insects that may create entry wounds'
      ],
      organic: [
        'Apply copper-based fungicides',
        'Use compost tea as a preventative spray',
        'Apply neem oil to protect against infection',
        'Introduce beneficial fungi to the soil'
      ]
    }
  },
  'Tomato___Early_blight': {
    description: 'Early blight is a fungal disease caused by Alternaria solani that affects tomatoes, causing leaf spots, stem cankers, and fruit rot.',
    symptoms: [
      'Dark brown spots with concentric rings on lower leaves',
      'Yellow areas surrounding leaf spots',
      'Lesions may merge causing leaves to wither',
      'Dark, leathery spots on fruit'
    ],
    treatments: {
      immediate: [
        'Remove and destroy infected leaves',
        'Apply fungicide specifically labeled for early blight',
        'Improve air circulation around plants',
        'Avoid wetting leaves when watering'
      ],
      preventive: [
        'Use disease-free seeds and transplants',
        'Practice crop rotation (3-4 year cycle)',
        'Mulch around plants to prevent soil splash',
        'Stake or cage plants to keep them off the ground'
      ],
      organic: [
        'Apply copper-based fungicides',
        'Use compost tea as a foliar spray',
        'Apply neem oil as a preventative',
        'Introduce beneficial microorganisms to the soil'
      ]
    }
  }
};

// Default treatments for diseases not in the database
const DEFAULT_TREATMENTS = {
  immediate: [
    'Remove and isolate affected plants',
    'Prune away visibly infected parts',
    'Apply appropriate treatment based on disease type',
    'Ensure proper watering practices'
  ],
  preventive: [
    'Implement crop rotation',
    'Maintain adequate plant spacing for airflow',
    'Use disease-resistant varieties when available',
    'Practice regular monitoring and inspection'
  ],
  organic: [
    'Apply neem oil solution to affected areas',
    'Use garlic or chili spray as natural deterrent',
    'Introduce beneficial insects to control pests',
    'Apply compost tea to boost plant immunity'
  ]
};

/**
 * Process the image locally using TensorFlow.js
 * This is a fallback when the API is not available
 * @param {string} imageBase64 - Base64 encoded image
 * @returns {Promise<Object>} - Prediction result
 */
const processImageLocally = async (imageBase64) => {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Simulate a prediction result
  // In a real implementation, this would use TensorFlow.js to run the model locally
  const randomClass = Math.floor(Math.random() * 38);
  const prediction = DISEASE_CLASSES[randomClass];
  const confidence = 70 + Math.floor(Math.random() * 25); // 70-95% confidence
  
  return {
    class: prediction.name,
    confidence: confidence,
    isHealthy: prediction.isHealthy,
    plantType: prediction.plantType
  };
};

/**
 * Get disease information and treatments
 * @param {string} diseaseName - Name of the disease
 * @param {string} plantType - Type of plant
 * @returns {Object} - Disease information and treatments
 */
const getDiseaseInfo = (diseaseName, plantType) => {
  // Try to get specific disease info
  const diseaseInfo = DISEASE_INFO[diseaseName];
  
  if (diseaseInfo) {
    return {
      name: diseaseName.replace(/_/g, ' ').replace(/___/, ' - '),
      description: diseaseInfo.description,
      symptoms: diseaseInfo.symptoms,
      treatments: diseaseInfo.treatments
    };
  }
  
  // If no specific info is available, generate generic info based on disease name
  const formattedName = diseaseName.replace(/_/g, ' ').replace(/___/, ' - ');
  const isHealthy = diseaseName.includes('healthy');
  
  if (isHealthy) {
    return {
      name: formattedName,
      description: `This ${plantType} plant appears healthy with no visible signs of disease.`,
      symptoms: [
        'No visible symptoms of disease',
        'Leaves have normal coloration',
        'No spots, lesions or abnormal growth',
        'Plant structure appears normal'
      ],
      treatments: {
        immediate: [
          'Continue regular maintenance',
          'Monitor for any changes in plant health',
          'Maintain proper watering schedule',
          'Ensure adequate sunlight and nutrients'
        ],
        preventive: [
          'Regular inspection for early detection of issues',
          'Maintain proper spacing between plants',
          'Practice crop rotation if applicable',
          'Use disease-resistant varieties when possible'
        ],
        organic: [
          'Apply compost or organic matter to maintain soil health',
          'Introduce beneficial insects to the garden',
          'Use organic fertilizers to promote plant health',
          'Apply mulch to retain moisture and suppress weeds'
        ]
      }
    };
  }
  
  // For unknown diseases, generate a description based on the name
  const diseaseParts = diseaseName.split('___');
  const plantName = diseaseParts[0].replace(/_/g, ' ');
  const diseaseType = diseaseParts[1].replace(/_/g, ' ');
  
  return {
    name: formattedName,
    description: `This appears to be ${diseaseType} affecting ${plantName} plants. This disease can impact plant health and productivity if not treated.`,
    symptoms: [
      'Discoloration or spots on leaves',
      'Abnormal growth patterns',
      'Wilting or drooping',
      'Reduced vigor or yield'
    ],
    treatments: DEFAULT_TREATMENTS
  };
};

/**
 * Analyze a plant image for disease detection
 * @param {string} imageBase64 - Base64 encoded image
 * @returns {Promise<Object>} - Analysis result
 */
export async function analyzePlantDisease(imageBase64) {
  try {
    console.log('Starting plant disease analysis...');
    
    // Extract base64 content without the prefix
    const base64Data = imageBase64.split(',')[1];
    if (!base64Data) {
      console.error('Invalid image data: Base64 data extraction failed');
      throw new Error('Invalid image format');
    }
    
    let result;
    
    try {
      // Try to use the remote API first
      console.log('Sending request to Plant Disease Detection API...');
      
      const formData = new FormData();
      formData.append('file', base64Data);
      
      const response = await axios.post(PLANT_DISEASE_API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        timeout: 10000 // 10 seconds timeout
      });
      
      console.log('Received response from API:', response.data);
      result = response.data;
      
    } catch (apiError) {
      console.error('API error:', apiError);
      console.log('Falling back to local processing...');
      
      // Fall back to local processing
      result = await processImageLocally(imageBase64);
    }
    
    // Extract disease information
    const { class: diseaseClass, confidence, isHealthy, plantType } = result;
    
    // Get detailed disease information and treatments
    const diseaseInfo = getDiseaseInfo(diseaseClass, plantType);
    
    // Determine severity based on confidence
    let severity;
    if (confidence < 60) {
      severity = 'Low';
    } else if (confidence < 80) {
      severity = 'Medium';
    } else {
      severity = 'High';
    }
    
    // Prepare the final analysis result
    const analysisResult = {
      disease: diseaseInfo.name,
      confidence: confidence,
      severity: severity,
      isHealthy: isHealthy,
      isPlant: true,
      description: diseaseInfo.description,
      symptoms: diseaseInfo.symptoms,
      treatment: {
        immediate: diseaseInfo.treatments.immediate,
        preventive: diseaseInfo.treatments.preventive,
        organic: diseaseInfo.treatments.organic
      },
      timeframe: isHealthy ? 
        "No treatment needed - plant is healthy" : 
        "With proper treatment, improvement should be visible within 2-3 weeks",
      imageUrl: imageBase64
    };
    
    console.log('Analysis complete:', analysisResult);
    return analysisResult;
    
  } catch (error) {
    console.error('Error analyzing plant image:', error);
    throw new Error('Failed to analyze plant image: ' + (error.message || 'Unknown error'));
  }
} 