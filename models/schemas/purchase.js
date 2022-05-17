import Joi from 'joi';

export const purchaseSchema = Joi.object({
    items: Joi.array().items(Joi.object({ product_id: Joi.string(), volume: Joi.number() })).required(),
    amount: Joi.number().required()
});