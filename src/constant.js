import { Firebase } from './ApiLayer';

export const ACTIVITY_CATEGORIES = {
  personal: "Personal",
  business: "Business",
  leisure: "Rest and restoration",
  fitness: "Fitness",
}

export const DEFAULT_ACTIVITY = {
  id: "",
  name: "",
  categories: [],
  dueDate: Firebase.firestore.Timestamp.now(),
  status: "incomplete",
  details: "",
}