"use client";

import {
  Modal,
  Button,
  Input,
  Textarea,
  Checkbox,
  Loader,
  Badge,
  Card,
  Group,
  Text,
  ActionIcon,
  Grid,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { getAllTasks } from "./Providers/api";

interface Task {
  id?: number;
  title: string;
  description?: string;
  date: string;
  isCompleted?: boolean;
  isImportant?: boolean;
}

export default function Home() {
  const [opened, { open, close }] = useDisclosure(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm<Task>();

  const onSubmit = async (data: Task) => {
    try {
      const res = await axios.post("/api/task", data);

      if (res.data.error) {
        toast.error(res.data.error);
      }

      if (res.data.success) {
        toast.success(res.data.success);
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  useEffect(() => {
    setLoading(true);
    getAllTasks().then((data) => {
      console.log(data?.body);
      setTasks(data?.body);
      setLoading(false);
    });
  }, []);

  return (
    <Grid>
      <Modal opened={opened} onClose={close} title="Create Task" centered>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="py-2">
            <Input {...register("title")} placeholder="Title" />
          </div>
          <div className="py-2">
            <Textarea {...register("description")} placeholder="Description" />
          </div>

          <div className="py-2">
            <Input {...register("date")} type="date" />
          </div>
          <div className="py-2">
            <Checkbox {...register("isCompleted")} label="Completed" />
          </div>
          <div className="py-2">
            <Checkbox {...register("isImportant")} label="Important" />
          </div>

          <div className="py-2 float-right">
            <Button type="submit">Create Task</Button>
          </div>
        </form>
      </Modal>

      <Grid.Col span={12} className="flex justify-between">
        <h1 className="text-2xl text-white underline underline-offset-4 decoration-4 decoration-green-600 tracking-wide">
          All Tasks
        </h1>
        <Button className="float-right" onClick={open}>
          Create
        </Button>
      </Grid.Col>

      <div className="flex gap-2 my-5">
        {loading ? (
          <Loader size={30} />
        ) : (
          tasks?.length &&
          tasks?.map((task: Task) => (
            <div
              className="w-80 bg-[#f9f9f910] border-2 border-solid border-[#f9f9f914] rounded-md p-5 shadow-lg"
              key={task.id}
            >
              <Group justify="space-between" mt="xs" mb="xs">
                <Text fw={500} tt={"uppercase"} c={"#f1f1f1"}>
                  {task?.title}
                </Text>
                <div className="flex gap-2">
                  {task?.isCompleted && <Badge color="green">Completed</Badge>}
                  {task?.isImportant && (
                    <Badge color="yellow">
                      <i className="fas fa-star"></i>
                    </Badge>
                  )}
                </div>
              </Group>

              <Text size="sm" c="dimmed">
                {task?.description}
              </Text>

              <div className="flex justify-between mt-4">
                <Text c={"#f1f1f1"}>{task?.date}</Text>
                <ActionIcon variant="transparent" c={"gray"}>
                  <i className="fas fa-pen-to-square"></i>
                </ActionIcon>
              </div>
            </div>
          ))
        )}
      </div>
    </Grid>
  );
}
