import { parentPort, workerData } from "worker_threads";

function generateFakeJobs(count: number) {
  const jobs = [];
  for (let i = 0; i < count; i++) {
    jobs.push({
      id: i + 1,
      title: `Job Title ${i + 1}`,
      description: `Job Description ${i + 1}`,
      location: `Location ${i + 1}`,
      salary: Math.floor(Math.random() * 100000) + 30000,
    });
  }

  // Simulate CPU-heavy task (renamed `loadCount`)
  let loadCount = 0;
  for (let j = 0; j < count; j++) {
    loadCount += j % 2;
  }

  parentPort?.postMessage({ total: jobs.length });
}

generateFakeJobs(workerData.batchSize);
