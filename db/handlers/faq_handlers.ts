import { FaqModel } from "../models/faq_model";

const getAllFaqs = async () => {
  const faqs = await FaqModel.find({});
  return faqs;
};

const getFaqById = async (id) => {
  const faq = await FaqModel.findOne({ _id: id });
  return faq;
};

const deleteFaqById = async (id) => {
  const faq = await FaqModel.findOne({ _id: id });
  if (faq) {
    await faq.remove();
  }
  return faq;
};

const updateFaq = async (data) => {
  const faq = await FaqModel.findOne({ _id: data._id });
  if (faq) {
    await FaqModel.updateOne(
      { _id: data._id },
      { $set: data, $inc: { age: 1 } }
    );
  }
  return faq;
};

const addFaq = async (data) => {
  const faq = new FaqModel({ ...data });
  return await faq.save();
};

export {
  getAllFaqs,
  getFaqById,
  deleteFaqById,
  updateFaq,
  addFaq,
};
