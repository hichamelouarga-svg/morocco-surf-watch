-- Create contact_submissions table to store form submissions
CREATE TABLE public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  inquiry_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT DEFAULT 'new',
  notes TEXT
);

-- Enable Row Level Security
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert contact submissions (public form)
CREATE POLICY "Anyone can submit contact form" 
ON public.contact_submissions 
FOR INSERT 
WITH CHECK (true);

-- Create policy for admin access (you can view all submissions)
CREATE POLICY "Admin can view all submissions" 
ON public.contact_submissions 
FOR SELECT 
USING (true);

-- Create policy for admin to update submissions (mark as read, add notes)
CREATE POLICY "Admin can update submissions" 
ON public.contact_submissions 
FOR UPDATE 
USING (true);