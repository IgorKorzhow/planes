<?php

namespace App\Http\Filters;

class FlightFilter extends QueryFilter
{
    public function search(?string $search = null)
    {
        if ($search != null)
            return $this->builder->where('name', 'like', $search.'%');
    }

    public function last(?string $last = null)
    {
        if ($last != null)
            return $this->builder->orderBy('created_at', 'desc');
    }
}
