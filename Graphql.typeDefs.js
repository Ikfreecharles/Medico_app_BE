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
      preferredCommunication: String
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
   }
   input PatientInput {
      patientID: String
      firstName: String
      lastName: String
      dob: String
      gender: String
      preferredCommunication: String
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

   #Doctor Definition
   type Doctor {
      id: ID!
      firstName: String!
      lastName: String!
   }

   #Queries
   type Query {
      getAllPatients: [Patient]
      getOnePatient(id: ID!): Patient
      getVitals: [Vital]
      getPatientVitals(id: ID!): [Vital]
   }

   #Mutations
   type Mutation {
      createPatient(input: PatientInput): Patient
      updatePatient(id: ID!, input: PatientInput): Patient
      createInsurance(input: InsuranceInput): Insurance
      createAddress(input: AddressInput): Address
      createExamination(input: ExaminationInput): Examination

      createVital(
         vitalType: String
         vitalNumber: String
         unit: String
         changeInfo: String
         changeDirection: Int
         patientId: ID!
      ): Vital
   }
`;

module.exports = { typeDefs };
