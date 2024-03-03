<?php

namespace App\Http\Filters;

class FlightFilter extends QueryFilter
{
    public function search(?string $search = null)
    {
        $this->builder->when($this->request->input('searchField') === 'departure_city', function ($query) {
            $query->where('departure_city', 'like', '%' . $this->request->input('search') . '%');
        })
            ->when($this->request->input('searchField') === 'arrival_city', function ($query) {
                $query->where('arrival_city', 'like', '%' . $this->request->input('search') . '%');
            });

        return $this->builder;
    }
}
