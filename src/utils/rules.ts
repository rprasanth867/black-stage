const validateString = (rule:any, value:any, callback:any) => {
  // Regular expression pattern to match the given criteria
  const pattern = /^[a-zA-Z0-9]+([-_.]?[a-zA-Z0-9]+)*$/;

  // Check if the string matches the pattern and has the correct length
  if (pattern.test(value) && value.length >= 1 && value.length <= 63) {
    callback()
  } else {
    callback('Invalid input');
  }
}

export const metaDataRules = {
    name: [
      { required: true, message: 'name is required' },
      { validator: validateString },
    ],
    namespace: [
      { validator: validateString },
    ],
    title: [],
    description: [],
    labels: [],
    annotations:[],
    tags:[],
    links:[],
};

const yamlRules = {
  apiVersion: [
    { required: true, message: 'apiVersion is required' },
  ],
  metadata: [
    { required: true, message: 'apiVersion is required' },
  ]
}