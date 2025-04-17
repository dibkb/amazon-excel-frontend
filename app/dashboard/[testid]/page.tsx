"use client";
import { geistMono } from "@/app/fonts";
import { getTestByTestId } from "@/db/query/test";
import { cn } from "@/lib/utils";
import { SelectABTest, SelectABTestReview } from "@/src/schema";
import { Map, Marker } from "pigeon-maps";
import { maptiler } from "pigeon-maps/providers";
import { use, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { VotePage } from "@/app/_components/vote/vote-page";
export default function DashboardPage({
  params,
}: {
  params: Promise<{ testid: string }>;
}) {
  const { testid } = use(params);
  const [test, setTest] = useState<{
    test: SelectABTest;
    reviews: SelectABTestReview[];
  } | null>(null);

  useEffect(() => {
    getTestByTestId(testid).then((res) => {
      if (res) {
        setTest(res);
      }
    });
  }, [testid]);

  const maptilerProvider = maptiler(
    process.env.NEXT_PUBLIC_MAPTILER_API_KEY!,
    "topo"
  );

  return (
    <div className="w-full">
      <div className="h-[700px]">
        <p className={cn("my-4", geistMono.className)}>Dashboard</p>
        <Map
          height={600}
          defaultCenter={[Number(28.7041), Number(77.1025)]}
          defaultZoom={4}
          provider={maptilerProvider}
        >
          {test?.reviews.map((review) => (
            <Marker
              key={review.id}
              width={30}
              anchor={[Number(review.latitude), Number(review.longitude)]}
            >
              <Image
                width="48"
                height="48"
                src="https://img.icons8.com/fluency/48/map-pin.png"
                alt="map-pin"
              />
            </Marker>
          ))}
        </Map>
      </div>
      <div className="max-h-[500px] overflow-y-auto">
        <p className={cn("my-4", geistMono.className)}>AB Test Details</p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Review</TableHead>
              <TableHead>Product Vote</TableHead>
              <TableHead>Thumbnail Vote</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {test?.reviews.map((review, id) => (
              <TableRow key={review.id + id}>
                <TableCell className="font-medium">
                  {review.name || "-"}
                </TableCell>
                <TableCell>{review.review || "-"}</TableCell>
                <TableCell>
                  <VotePage vote={review.product || ""} />
                </TableCell>
                <TableCell>
                  <VotePage vote={review.thumbnail || ""} />
                </TableCell>
                <TableCell>{review.city}</TableCell>
                <TableCell>{review.createdAt.toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
