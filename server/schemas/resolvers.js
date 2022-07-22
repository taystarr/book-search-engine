const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, {username, email, _id }, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
                return userData;
            }
            throw new AuthenticationError('You must log in first!');
        },
    },


    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('User not found');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },

        saveBook: async (parent, { userInput, newBook }) => {
            try {
                const updateUser = await User.findOneAndUpdate(
                    { _id: userInput._id },
                    { $push: { savedBooks: newBook }},
                    { new: true, runValidators: true }
                );
                return updateUser;
            } catch (err) {
                console.log(err);
            }
        },

        deleteBook: async (parent, { userInput, bookId }) => {
            try {
                const updateUser = await User.findOneAndUpdate(
                    { _id: userInput._id },
                    { $pull: { savedBooks: { bookdId: bookId } } },
                    { new: true, runValidators: true }
                );
                return updateUser;
            } catch (err) {
                console.log(err);
            }
        }
    }
};

module.exports = resolvers;