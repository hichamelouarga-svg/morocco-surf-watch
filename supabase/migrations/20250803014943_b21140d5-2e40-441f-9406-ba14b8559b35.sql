-- Create manual_news table for editorial articles
CREATE TABLE public.manual_news (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  category TEXT NOT NULL,
  date TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.manual_news ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access (since this is a public news site)
CREATE POLICY "Anyone can view manual news" 
ON public.manual_news 
FOR SELECT 
USING (true);

-- Create policy to allow anyone to create news (you may want to restrict this later)
CREATE POLICY "Anyone can create manual news" 
ON public.manual_news 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow anyone to update news (you may want to restrict this later)
CREATE POLICY "Anyone can update manual news" 
ON public.manual_news 
FOR UPDATE 
USING (true);

-- Create policy to allow anyone to delete news (you may want to restrict this later)
CREATE POLICY "Anyone can delete manual news" 
ON public.manual_news 
FOR DELETE 
USING (true);