-- Fix security vulnerability: Restrict contact submissions access to authorized staff only

-- Drop the existing overly permissive policy
DROP POLICY IF EXISTS "Only authenticated users can view contact submissions" ON public.contact_submissions;

-- Create new restrictive policy that only allows admins and moderators to view contact submissions
CREATE POLICY "Only admins and moderators can view contact submissions"
ON public.contact_submissions
FOR SELECT
TO authenticated
USING (
  public.has_role(auth.uid(), 'admin'::app_role) OR 
  public.has_role(auth.uid(), 'moderator'::app_role)
);

-- Ensure admins and moderators can also update/delete contact submissions for management purposes
CREATE POLICY "Only admins and moderators can update contact submissions"
ON public.contact_submissions
FOR UPDATE
TO authenticated
USING (
  public.has_role(auth.uid(), 'admin'::app_role) OR 
  public.has_role(auth.uid(), 'moderator'::app_role)
)
WITH CHECK (
  public.has_role(auth.uid(), 'admin'::app_role) OR 
  public.has_role(auth.uid(), 'moderator'::app_role)
);

CREATE POLICY "Only admins can delete contact submissions"
ON public.contact_submissions
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));