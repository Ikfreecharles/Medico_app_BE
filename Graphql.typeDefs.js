const { gql } = require("apollo-server-express");

const typeDefs = gql`
   #Patient Definition
   type Patient {
      id: ID!
      patientID: String!
      firstName: String!
      lastName: String!
      dob: String!
      gender: String!
      address: Address
      height: String
      weight: String
      maritalStatus: String
      hobbies: [String]
      spouse: String
      children: Int
      preferredCommunication: String
      email: String
      language: [String]
      insurance: Insurance
      conditions: [String]
      medications: [String]
      allergies: [String]
      lastAppointment: String
      vitals: [Vital]
      admittedDate: String
      status: Int
      examination: Examination
      diagnosis: String
      recovery: Int
      test: Int
      activities: [Activity]
   }
   input PatientInput {
      patientID: String!
      firstName: String!
      lastName: String!
      dob: String!
      gender: String!
      height: String
      weight: String
      maritalStatus: String
      hobbies: [String]
      spouse: String
      children: Int
      preferredCommunication: String
      email: String
      language: [String]
      conditions: [String]
      medications: [String]
      allergies: [String]
      lastAppointment: String
      admittedDate: String
      status: Int
      diagnosis: String
      recovery: Int
      test: Int
   }
   input VitalInput {
      patientId: ID!
      vitalType: String
      vitalNumber: String
      unit: String
      changeInfo: String
      changeDirection: Int
   }
   input AddressInput {
      patientId: ID!
      address: String
      postCode: String
      state: String
   }
   input InsuranceInput {
      patientId: ID!
      insuranceName: String
      insuranceNumber: String
   }
   input ExaminationInput {
      patientId: ID!
      marker: Int!
      examination: String!
   }
   input ActivityInput {
      patientId: ID!
      activity: String!
      activitySince: String!
      progress: Int!
   }
   input GoalsInput {
      activityId: ID!
      subject: String!
      priority: String!
      date: String!
      status: Int
      frequency: String!
      assignedTo: String!
   }

   type Vital {
      id: ID!
      vitalType: String
      vitalNumber: String
      unit: String
      changeInfo: String
      changeDirection: Int
      patientId: Patient
   }
   type Address {
      id: ID!
      address: String
      postCode: String
      state: String
   }
   type Insurance {
      id: ID!
      insuranceName: String
      insuranceNumber: String
   }
   type Examination {
      id: ID!
      marker: Int
      examination: String
   }
   type Activity {
      id: ID!
      activity: String!
      activitySince: String!
      progress: Int
      goals: [Goals]
      patientId: Patient
   }
   type Goals {
      id: ID!
      subject: String!
      priority: String
      date: String!
      status: Int
      frequency: String!
      assignedTo: String
   }

   #Doctor Definition
   type Doctor {
      id: ID!
      firstName: String!
      lastName: String!
      dob: String!
      gender: String!
      phoneNumber: Int!
      workPlace: String
      agent: String
      patientId: Patient
   }
   input DoctorInput {
      firstName: String!
      lastName: String!
      dob: String!
      gender: String!
      phoneNumber: Int!
      workPlace: String
      agent: String
   }

   #Queries
   type Query {
      getAllPatients: [Patient]
      getOnePatient(id: ID!): Patient
      getVitals: [Vital]
      getPatientVitals(id: ID!): [Vital]
      getAllPatientActivities(patientId: ID!): [Activity]
      getAllDoctors: [Doctor]
      getOneDoctor(id: ID!): Doctor
   }

   #Mutations
   type Mutation {
      createPatient(input: PatientInput): Patient
      updatePatient(id: ID!, input: PatientInput): Patient
      createInsurance(input: InsuranceInput): Patient
      createAddress(input: AddressInput): Patient
      createExamination(input: ExaminationInput): Patient
      createVital(input: VitalInput): Patient
      deletePatient(id: ID!): Patient
      createActivity(input: ActivityInput): Activity
      addGoals(input: GoalsInput): Activity
      createDoctor(input: DoctorInput): Doctor
   }
`;

module.exports = { typeDefs };
