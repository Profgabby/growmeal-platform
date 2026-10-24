# Garden journal events

Event schema proposal: journal_id, owner_id, garden_id, crop_id, event_type (plant, water, observe, thin, transplant, problem, intervention, photo, harvest), event_date, quantity, unit, notes, photo_reference, created_at.

Protect child data; private by default. Do not collect exact household coordinates unnecessarily. Implement no shared Supabase migrations in this branch until integration is coordinated.
