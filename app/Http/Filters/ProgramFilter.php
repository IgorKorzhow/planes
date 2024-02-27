<?php

namespace App\Http\Filters;

class ProgramFilter extends QueryFilter
{
    public function search(?string $search = null)
    {
        if ($search != null)
            return $this->builder->where('header', 'like', $search.'%');
    }

    public function last(?string $last = null)
    {
        if ($last != null)
            return $this->builder->orderBy('created_at', 'desc');
    }
}
