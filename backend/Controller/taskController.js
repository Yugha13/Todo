const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();



const addTask = async ( req, res ) => {
    const { task } = req.body;
    console.log(task);
    const oldUser = await prisma.task.create({
       data: {
         title: task ,
         user: {
           connect: {
             gmail : req.body.gmail,
           },
         },
       },
    });
    console.log(oldUser);
    return res.json({ msg : `task- ${task} created` });
}


const editTask = async ( req, res ) => {
  const { taskId, newTask } = req.body;
  await prisma.task.update({
    where : {
      id : taskId
    },
    data : {
      title: newTask
    }
  })
  return res.json({ msg : `task updated to ${newTask}`});
}

const showTask = async ( req, res ) => {
  const allTask = await prisma.user.findFirst({
    include : {
      tasks : true
    },
    where : {
      gmail : req.body.gmail
    }
  });
  
  const tasks = allTask.tasks?.map( item => (item.title));
  return res.json({ tasks });
}


const deleteTask = async ( req, res ) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        gmail: req.body.gmail,
      },
      include: {
        tasks: true,
      },
    });
  
    if (user) {
      await prisma.task.delete({
        where: {
          id: req.body.taskId,
          userId: user.id,
        },
      });
      return res.json({ msg : "task deleted " });
    }
  } catch (e) {
    return res.json({ msg : "no task found" });
  }
}



module.exports = {
  addTask,
  editTask,
  showTask,
  deleteTask
};