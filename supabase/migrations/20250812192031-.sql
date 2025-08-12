-- 1) Create app_role enum safely
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_type t
    JOIN pg_namespace n ON n.oid = t.typnamespace
    WHERE t.typname = 'app_role' AND n.nspname = 'public'
  ) THEN
    CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
  END IF;
END
$$;

-- 2) Create user_roles table (if not exists)
CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);

-- Enable RLS (safe to run multiple times)
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Optional index for performance
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles(user_id);

-- 3) Helper function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles ur
    WHERE ur.user_id = _user_id
      AND ur.role = _role
  );
$$;

-- 4) Harden contact_submissions RLS
-- Drop overly permissive policies
DROP POLICY IF EXISTS "Admin can view all submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Admin can update submissions" ON public.contact_submissions;

-- Keep existing INSERT policy (public can submit). Add strict admin-only read/update/delete
CREATE POLICY "Admins can view contact submissions"
ON public.contact_submissions
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update contact submissions"
ON public.contact_submissions
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Allow admins to delete if needed
CREATE POLICY "Admins can delete contact submissions"
ON public.contact_submissions
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 5) Harden manual_news RLS
-- Drop public write policies
DROP POLICY IF EXISTS "Anyone can create manual news" ON public.manual_news;
DROP POLICY IF EXISTS "Anyone can update manual news" ON public.manual_news;
DROP POLICY IF EXISTS "Anyone can delete manual news" ON public.manual_news;

-- Keep public SELECT (view) policy as-is. Require admin for mutations
CREATE POLICY "Admins can create manual news"
ON public.manual_news
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update manual news"
ON public.manual_news
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete manual news"
ON public.manual_news
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));