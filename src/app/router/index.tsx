import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PlanetsListPage, PlanetDetailsPage } from "@/features/planets/pages";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PlanetsListPage />} />
        <Route path="/planets/:id" element={<PlanetDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
