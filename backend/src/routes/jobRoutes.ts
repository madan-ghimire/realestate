import { Router } from "express";

const router = Router();

function generateFakeJobs(count: number): number[] {
  const jobs = [];
  for (let i = 0; i < count; i++) {
    jobs.push(i); // Simulate job data
  }
  return jobs;
}

/**
 * @swagger
 * /api/jobs/generate-blocking:
 *   get:
 *     summary: Generate jobs in the main thread (blocking)
 *     tags: [Jobs]
 *     responses:
 *       200:
 *         description: Jobs generated successfully (blocking)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 total:
 *                   type: number
 *       500:
 *         description: Internal server error
 */

router.get("/generate-blocking", async (req, res) => {
  const runs = 100;
  let totalJobs = 0;

  for (let i = 0; i < runs; i++) {
    const jobs = generateFakeJobs(10_000); // 1 million jobs per run
    totalJobs += jobs.length;
  }

  res.json({ message: "Jobs generated (blocking)", total: totalJobs });
});

export default router;

// import { Router } from "express";
// import { Worker } from "worker_threads";
// import path from "path";

// const router = Router();

// /**
//  * @swagger
//  * /api/jobs/generate-worker:
//  *   get:
//  *     summary: Generate jobs using worker threads (non-blocking)
//  *     tags: [Jobs]
//  *     responses:
//  *       200:
//  *         description: Jobs generated successfully (with worker)
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                 total:
//  *                   type: number
//  *       500:
//  *         description: Internal server error
//  */
// router.get("/generate-worker", async (req, res) => {
//   const runs = 100;
//   const batchSize = 10_000;
//   const MAX_CONCURRENT = 8;

//   let total = 0;
//   let completed = 0;
//   let active = 0;
//   let i = 0;

//   const tick = performance.now();

//   const startWorker = () => {
//     if (i >= runs) return;

//     active++;
//     const worker = new Worker(
//       path.resolve(__dirname, "../workers/jobWorker.ts"),
//       {
//         execArgv: ["-r", "ts-node/register"],
//         workerData: { batchSize },
//       }
//     );

//     worker.on("message", (result) => {
//       total += result.total;
//       completed++;
//       active--;

//       console.log(`Run ${completed}/${runs}: Completed`);

//       if (completed === runs) {
//         const tock = performance.now();
//         console.log(`Worker threads took ${tock - tick} ms`);
//         return res.json({ message: "Jobs generated (worker threads)", total });
//       }

//       startWorker(); // Launch next one in queue
//     });

//     worker.on("error", (err) => {
//       console.error("Worker error:", err);
//       return res.status(500).json({ message: "Worker error" });
//     });

//     i++;
//   };

//   // Start initial limited workers
//   for (let j = 0; j < Math.min(MAX_CONCURRENT, runs); j++) {
//     startWorker();
//   }
// });

// export default router;
