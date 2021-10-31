const Patient = require("./Models/Patients.model");
const Vital = require("./Models/Vitals.model");
const mongoose = require("mongoose");

const resolvers = {
   Query: {
      getAllPatients: async () => {
         try {
            return Patient.find();
         } catch (error) {
            console.log(error);
         }
      },
      getOnePatient: async (_, { id }) => {
         try {
            return Patient.findById(id);
         } catch (error) {
            console.log(error);
         }
      },
      getVitals: async () => {
         try {
            return await Vital.find();
         } catch (error) {
            console.log(error);
         }
      },
      getPatientVitals: async (_, { id }) => {
         try {
            return Vital.find({});
         } catch (error) {
            console.log(error);
         }
      },
   },
   Patient: {
      vitals: async (parent) => {
         try {
            console.log(parent);
            return await Vital.find({ patientId: parent._id });
         } catch (error) {
            console.log(error);
         }
      },
   },
   Vital: {
      patientId: async (parent) => {
         try {
            console.log(parent);
            return await Patient.findById(parent.patientId);
         } catch (error) {
            console.log(error);
         }
      },
   },
   Mutation: {
      createPatient: async (_, { input }) => {
         try {
            const newPatient = new Patient(input);
            await newPatient.save();
            return newPatient;
         } catch (error) {
            console.log(error);
         }
      },
      updatePatient: async (_, args) => {
         try {
            await Patient.findByIdAndUpdate(
               { _id: args.id },
               {
                  $set: {
                     gender: args.input.gender,
                     admittedDate: args.input.admittedDate,
                     status: args.input.status,
                     examination: args.input.examination,
                     diagnosis: args.input.diagnosis,
                     recovery: args.input.recovery,
                     test: args.input.test,
                  },
               }
            );
            return Patient;
         } catch (error) {
            console.log(error);
         }
      },
      createInsurance: async (_, { input }) => {
         try {
            const patient = await Patient.findById(input.patientId);
            if (!patient) throw new Error("Patient does not exist");
            try {
               await Patient.findByIdAndUpdate(
                  { _id: input.patientId },
                  {
                     $set: {
                        insurance: input,
                     },
                  },
                  { new: true }
               );
               return patient;
            } catch (error) {
               console.log(error);
            }
         } catch (error) {
            console.log(error);
         }
      },
      createAddress: async (_, { input }) => {
         try {
            const patient = await Patient.findById(input.patientId);
            if (!patient) throw new Error("Patient does not exist");
            try {
               await Patient.findByIdAndUpdate(
                  { _id: input.patientId },
                  { $set: { address: input } },
                  { new: true }
               );
               return patient;
            } catch (error) {
               console.log(error);
            }
         } catch (error) {
            console.log(error);
         }
      },
      createVital: async (_, args) => {
         try {
            const patient = await Patient.findById(args.patientId);
            if (!patient) throw new Error("Patient not found");
            const newVitals = new Vital(args);

            await newVitals.save();
            if (!mongoose.Types.ObjectId.isValid(newVitals._id)) {
               throw new Error("Parameter not valid");
            } else {
               await Patient.findByIdAndUpdate(
                  { _id: args.patientId },
                  { $push: { vitals: newVitals._id } },
                  { new: true }
               );
            }
            return patient;
         } catch (error) {
            console.log(error);
         }
      },
      createExamination: async (_, { input }) => {
         try {
            const patient = await Patient.findById(input.patientId);
            if (!patient) throw new Error("Patient not found");
            try {
               await Patient.findByIdAndUpdate(
                  { _id: input.patientId },
                  { $set: { examination: input } }
               );
               return patient;
            } catch (error) {
               console.log(error);
            }
         } catch (error) {
            console.log(error);
         }
      },
   },
};

module.exports = { resolvers };
