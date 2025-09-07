import Router from 'express'
import { createSupplier, getAllSuppliers, getSupplier } from '../controllers/supplier.controller'

const supplierRouter = Router()

supplierRouter.post("/", createSupplier)
supplierRouter.get('/', getAllSuppliers)
supplierRouter.get('/:id', getSupplier)

export default supplierRouter
