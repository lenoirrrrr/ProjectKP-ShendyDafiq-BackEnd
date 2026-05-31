import supabase from '../config/supabase.js';

export const requireAuth = async (req, res, next) => {
  // Authentication disabled for now
  next();
};
