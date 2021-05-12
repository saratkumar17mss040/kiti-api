const { Address } = require('../models/address.v1.model');
const { extend } = require('lodash');

const getAllAddressesOfUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const addresses = await Address.find({ userId: userId });
        res.status(200).json({ success: true, response: addresses });
    } catch (error) {
        res.status(500).json({
            success: false,
            message:
                'Request failed, Please check the errorMessage key for more details',
            errorMessage: error.message,
        });
    }
};

const createNewAddress = async (req, res) => {
    try {
        const { userId } = req.params;
        let newAddress = req.body;
        // extract cart - userId - based on that cart.addressId = 
        newAddress = new Address(newAddress);

        await newAddress.save();

        const updatedAddresses = await Address.find({ userId: userId });

        res.status(201).json({
            success: true,
            response: updatedAddresses,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message:
                'Request failed, Please check the errorMessage key for more details',
            errorMessage: error.message,
        });
    }
};

const updateAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.params;
        const addressUpdates = req.body;

        let address = await Address.findById({ _id: addressId });
        address = extend(address, addressUpdates);

        await address.save();

        const updatedAddresses = await Address.find({ userId: userId });

        res.status(200).json({
            success: true,
            response: updatedAddresses,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message:
                'Request failed, Please check the errorMessage key for more details',
            errorMessage: error.message,
        });
    }
};

const deleteAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.params;

        const address = await Address.findById({ _id: addressId });

        await address.remove();

        const updatedAddresses = await Address.find({ userId: userId });

        res.status(200).json({
            success: true,
            response: updatedAddresses,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message:
                'Request failed, Please check the errorMessage key for more details',
            errorMessage: error.message,
        });
    }
};

module.exports = {
    getAllAddressesOfUser,
    createNewAddress,
    updateAddress,
    deleteAddress,
};
