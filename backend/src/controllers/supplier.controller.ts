
import { Request, Response } from 'express'
import * as supplierService from '../services/supplier.service'

// Display a list of all suppliers.
export const getAllSuppliers = async (req:Request, res:Response) => {
    try {
        const suppliers = await supplierService.getAllSuppliers()
        res.status(200).json({success:true, data:suppliers})
        
    } catch (error) {
        console.error('Unable to get suppliers')
    }
}

// Display a supplier.
export const getSupplier = async (req:Request, res:Response) => {
    try {
        const supplier = await supplierService.getSupplier(req.params.id)
        if(!supplier){
            throw Error('User not found')
        }
        res.status(200).json({success:true, data:supplier})
        
    } catch (error) {
        console.error('Unable to find supplier')
    }
}

// Add a new supplier.
export const createSupplier = async (req:Request, res:Response) => {
    try {
        const newSupplier = await supplierService.createSupplier(req.body)
        res.status(201).json({success:true, data:newSupplier})
        
    } catch (error) {
        console.error('Could not add supplier')
    }
}

// - **Search**: Filter suppliers by name, items they provide (through a product search), or unique code (which you could add, such as a supplier ID).
export const searchSuppliers = async (req:Request, res:Response) => {
    try {
        const { companyName, product, code, sort, order } = req.query
        const suppliers = await supplierService.searchSuppliers(
            typeof companyName === 'string' ? companyName : '',
            typeof product === 'string' ? product : '',
            typeof code === 'string' ? code : '',
            typeof sort === 'string' ? sort : 'CompanyName',
            typeof order === 'string' ? order : 'Ascending'
        )
        res.status(200).json({success:true, data:suppliers})
    } catch (error) {
        console.error('Could not search suppliers')
    }
}


// - **Update**: Modify an existing supplier's details.

export const updateSupplier = async (req:Request, res:Response) => {
    try {
        const updatedSupplier = await supplierService.updateSupplier(req.params.id, req.body)
        if(!updatedSupplier){
            throw Error('Supplier not found')
        }
        res.status(200).json({success:true, data:updatedSupplier})
        
    } catch (error) {
        console.error('Could not update supplier')
    }
}


// Remove a supplier.

export const deleteSupplier = async (req:Request, res:Response) => {
    try {
        const deletedSupplier = await supplierService.deleteSupplier(req.params.id)
        if(!deletedSupplier){
            throw Error('Supplier not found')
        }
        res.status(200).json({success:true, data:deletedSupplier})

    } catch (error) {
        console.error('Could not delete supplier')
    }
}

