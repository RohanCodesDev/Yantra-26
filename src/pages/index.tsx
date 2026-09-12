import Head from "next/head";
import { ParticleStage } from "@/components/ParticleStage";

export default function Home() {
  return (
    <>
      <Head>
        <title>YANTRA 2026</title>
        <meta name="description" content="YANTRA — Introductory Fest 2026" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <ParticleStage />
    </>
  );
}
