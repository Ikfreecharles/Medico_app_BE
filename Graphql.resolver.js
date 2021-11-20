const Patient = require("./Models/Patients.model");
const Vital = require("./Models/Vitals.model");
const Activity = require("./Models/Activity.model");
const Doctor = require("./Models/Doctor.model");
const mongoose = require("mongoose");
const { UserInputError } = require("apollo-server-express");

const resolvers = {
   Query: {
      getAllPatients: async () => {
         try {
            return await Patient.find();
         } catch (error) {
            return error;
         }
      },
      getOnePatient: async (_, { id }) => {
         try {
            if (!id) throw new UserInputError("id not valid");
            return await Patient.findById(id);
         } catch (error) {
            return error;
         }
      },
      getVitals: async () => {
         try {
            return await Vital.find();
         } catch (error) {
            return error;
         }
      },
      getPatientVitals: async (_, { id }) => {
         try {
            if (!id)
               throw new UserInputError("PatientId incorrect/not provided");
            return await Activity.find({ patientId: id });
         } catch (error) {
            return error;
         }
      },
      getAllPatientActivities: async (_, { patientId }) => {
         try {
            if (!patientId)
               throw new UserInputError("PatientId incorrect/not provided");
            return await Activity.find({ patientId: patientId });
         } catch (error) {
            return error;
         }
      },
      getAllDoctors: async () => {
         try {
            return await Doctor.find({});
         } catch (error) {
            return error;
         }
      },
      getOneDoctor: async (_, { id }) => {
         try {
            if (!id)
               throw new UserInputError("Doctor id incorrect/not provided");
            return await Doctor.findById(id);
         } catch (error) {
            return error;
         }
      },
   },
   Patient: {
      vitals: async (parent) => {
         try {
            return await Vital.find({ patientId: parent._id });
         } catch (error) {
            return error;
         }
      },
      activities: async (parent) => {
         try {
            return await Activity.find({ patientId: parent._id });
         } catch (error) {
            return error;
         }
      },
   },
   Vital: {
      patientId: async (parent) => {
         try {
            return await Patient.findById(parent.patientId);
         } catch (error) {
            return error;
         }
      },
   },
   Activity: {
      patientId: async (parent) => {
         try {
            return await Patient.findById(parent.patientId);
         } catch (error) {
            return error;
         }
      },
   },
   Doctor: {
      patientId: async (parent) => {
         try {
            return await Patient.find({ patientId: parent._id });
         } catch (error) {
            return error;
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
            return error;
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
            return error;
         }
      },
      createInsurance: async (_, { input }) => {
         try {
            if (!input.patientId)
               throw new UserInputError("PatientId not provided");
            const patient = await Patient.findById(input.patientId);
            if (!patient) throw new Error("Patient does not exist");

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
            return error;
         }
      },
      createAddress: async (_, { input }) => {
         try {
            const patient = await Patient.findById(input.patientId);
            if (!patient) throw new Error("Patient does not exist");

            await Patient.findByIdAndUpdate(
               { _id: input.patientId },
               { $set: { address: input } },
               { new: true }
            );
            return patient;
         } catch (error) {
            return error;
         }
      },
      createVital: async (_, { input }) => {
         try {
            if (!input.patientId)
               throw new UserInputError("PatientId not provided");
            const patient = await Patient.findById(input.patientId);
            if (!patient) throw new UserInputError("Patient not found");

            const patientWithIdVitals = await Vital.find({
               patientId: input.patientId,
            });
            const vitalInDB = await patientWithIdVitals.find(
               ({ vitalType }) => vitalType === input.vitalType
            );
            if (vitalInDB) throw new UserInputError("Vital already exists");

            const newVitals = new Vital(input);
            await newVitals.save();
            if (!mongoose.Types.ObjectId.isValid(newVitals._id)) {
               throw new Error("Parameter not valid");
            }
            await Patient.findByIdAndUpdate(
               { _id: input.patientId },
               { $push: { vitals: newVitals._id } },
               { new: true }
            );

            return patient;
         } catch (error) {
            return error;
         }
      },
      createExamination: async (_, { input }) => {
         try {
            if (!input.patientId)
               throw new UserInputError("PatientId not provided");
            const patient = await Patient.findById(input.patientId);
            if (!patient) throw new UserInputError("Patient not found");
            try {
               await Patient.findByIdAndUpdate(
                  { _id: input.patientId },
                  { $set: { examination: input } }
               );
               return patient;
            } catch (error) {
               return error;
            }
         } catch (error) {
            return error;
         }
      },
      deletePatient: async (_, args) => {
         try {
            if (!args.id) throw new UserInputError("PatientId not provided");
            try {
               await Patient.findByIdAndDelete(args.id);
               return Patient;
            } catch (error) {
               return error;
            }
         } catch (error) {
            return error;
         }
      },
      createActivity: async (_, { input }) => {
         try {
            if (!input.patientId)
               throw new UserInputError("PatientId is not provided");
            if (!input) throw new UserInputError("The input is invalid");
            const patient = await Patient.findById({ _id: input.patientId });
            if (!patient) throw new error("Patient not found");
            const activity = await new Activity(input);
            await activity.save();
            await Patient.findByIdAndUpdate(
               { _id: input.patientId },
               { $push: { activities: activity._id } },
               { new: true }
            );
            return activity;
         } catch (error) {
            return error;
         }
      },
      addGoals: async (_, { input }) => {
         try {
            if (!input.activityId)
               throw new UserInputError("Activity id not found");
            if (
               !input.subject ||
               !input.priority ||
               !input.date ||
               !input.frequency ||
               !input.assignedTo
            )
               throw new UserInputError("Input is missing");
            const activity = await Activity.findById({ _id: input.activityId });
            if (!activity) throw new UserInputError("Activity not found");
            await Activity.findByIdAndUpdate(
               { _id: input.activityId },
               { $push: { goals: input } },
               { new: true }
            );
            return activity;
         } catch (error) {
            return error;
         }
      },
      createDoctor: async (_, { input }) => {
         try {
            if (!input) throw new UserInputError("Input error");
            if (
               !input.firstName ||
               !input.lastName ||
               !input.dob ||
               !input.gender ||
               !input.phoneNumber
            )
               throw new UserInputError("Input is missing");
            const doctor = new Doctor(input);
            await doctor.save();
            return doctor;
         } catch (error) {
            return error;
         }
      },
   },
};

module.exports = { resolvers };
