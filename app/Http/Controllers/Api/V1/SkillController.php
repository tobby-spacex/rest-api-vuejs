<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSkillRequest;
use App\Http\Resources\V1\SkillResource;
use App\Models\Skill;

class SkillController extends Controller
{
    public function index()
    {
        return SkillResource::collection(Skill::all());
    }

    public function show(Skill $skill)
    {
        return new SkillResource($skill);
    }

    public function store(StoreSkillRequest $request)
    {
        Skill::create($request->validated());
        return response()->json(['success' => true]);
    }

    public function update(StoreSkillRequest $request, Skill $skill)
    {
        $skill->update($request->validated());
        return response()->json(['success' => true, 'the data updated']);
    }

    public function destroy(Skill $skill)
    {
        $skill->delete();
        return response()->json(['success' => true]);
    }
}
