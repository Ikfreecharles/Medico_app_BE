const graphql = require("graphql");
const Patient = require("./Models/Patients.model");

const {
   GraphQLObjectType,
   GraphQLID,
   GraphQLString,
   GraphQLInt,
   GraphQLSchema,
   GraphQLNonNull,
   GraphQLList,
   GraphQLBoolean,
} = graphql;

const PatientType = new GraphQLObjectType({
   name: "Patient",
   fields: () => ({
      id: { type: GraphQLID },
      firstName: { type: GraphQLString },
      lastName: { type: GraphQLString },
   }),
});

const InsuranceType = new GraphQLObjectType({
   name: "Insurance",
   fields: () => ({
      id: { type: GraphQLID },
      companyName: { type: GraphQLString },
      customerNumber: { type: GraphQLString },
      patient: {
         type: PatientType,
         resolve(parent, args) {
            return Patient.findById(parent.patientId);
         },
      },
   }),
});

const RootQuery = new GraphQLObjectType({
   name: "RootQueryType",
   fields: {
      patient: {
         type: new GraphQLList(PatientType),
         resolve(parent, args) {
            return Patient.find({});
         },
      },
      getPatientById: {
         type: PatientType,
         args: { id: { type: GraphQLString } },
         resolve(parent, args) {
            return Patient.findOne({ title: args.title });
         },
      },
   },
});

const Mutation = new GraphQLObjectType({
   name: "Mutation",
   fields: {
      addPatient: {
         type: PatientType,
         args: {
            firstName: { type: new GraphQLNonNull(GraphQLString) },
            lastName: { type: new GraphQLNonNull(GraphQLString) },
         },
         resolve(parent, arg) {
            let patient = new Collection({
               firstName: arg.firstName,
               lastName: arg.lastName,
            });
            return patient.save();
         },
      },
   },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
