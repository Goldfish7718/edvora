"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import useCourse from "@/hooks/useCourse";
import { Spinner } from "./ui/spinner";

type NewCourseTriggerProps = {
  children: React.ReactNode;
  onCreate: () => void;
};

function NewCourseTrigger({ children, onCreate }: NewCourseTriggerProps) {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    title: "",
    instructor: "",
    description: "",
    category: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const { requestAddCourse } = useCourse();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const { category, description, instructor, title } = form;

      await requestAddCourse(title, description, instructor, category);
      await onCreate();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };

  const content = (
    <section className="space-y-4 p-2">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full rounded border px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Instructor</label>
        <input
          name="instructor"
          value={form.instructor}
          onChange={handleChange}
          className="w-full rounded border px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full rounded border px-3 py-2 h-28"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full rounded border px-3 py-2"
          required
        />
      </div>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => setOpen(false)}
          disabled={isLoading}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? (
            <>
              <Spinner /> Creating...
            </>
          ) : (
            "Create course"
          )}
        </Button>
      </div>
    </section>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Course</DialogTitle>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
}

export default NewCourseTrigger;
