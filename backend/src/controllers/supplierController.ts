import Supplier from "../models/supplier";
import { Request, Response } from 'express'

// Display a list of all suppliers.
export const getAllSuppliers = async (req:Request, res:Response) => {
    try {
        const suppliers = await Supplier.find()
        res.status(200).json({success:true, data:suppliers})
        
    } catch (error) {
        console.error('Unable to get suppliers')
    }
}

// Display a supplier.
export const getSupplier = async (req:Request, res:Response) => {
    try {
        const supplier = await Supplier.find({_id: req.params.id})
        if(!supplier){
            throw Error('User not found')
        }
        res.status(200).json({success:true, data:supplier})
        
    } catch (error) {
        console.error('Unable to find supplier')
    }

}

// - **Create**: Add a new supplier.

export const createSupplier = async (req:Request, res:Response) => {
    try {
        const newSupplier = await Supplier.create(req.body)
        res.status(201).json({success:true, data:newSupplier})
        
    } catch (error) {
        console.error('Could not add supplier')
    }

}





// - **Search**: Filter suppliers by name, items they provide (through a product search), or unique code (which you could add, such as a supplier ID).

// - **Update**: Modify an existing supplier's details.


// Remove a supplier.



