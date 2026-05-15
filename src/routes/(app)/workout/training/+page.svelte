

<script lang="ts">
    let isCoach: boolean = true; //fetch this info on user

    let newExercise: string = $state("");
    let ExerciseList: string[] = $state([]);

    let tables: table[] = $state([]);
    type tableRow = {
        Exercise: string;
    };
    type tableColumn = {
        Name: string;
    }
    type table = {
        rows: tableRow[];
        columns: tableColumn[];
        InformationGrid: [string[]]; //rows x columns [0,1] is 0 row and 1 column


    };


    function addTable() {

        let exercise: string = "Exercise...";
        let columnName = "Information...";
        let newTableColumn: tableColumn = {
            Name: columnName,
        }
        let newTableRow: tableRow = {
            Exercise: exercise,
        }
        let newTable: table = {
            rows: [newTableRow],
            columns: [newTableColumn],
            InformationGrid: [[""]],
        }

        tables.push(newTable);
        console.log(newTable);
        console.log("added table");
    }

    function addRowToTable(tableIndex: number, ) {
        let exercise: string = "Exercise...";
        let newRow: tableRow = {
            Exercise: exercise,
        }
        tables[tableIndex].rows.push(newRow);

        //for a new row the InformationGrid needs to get a new array of length columnLength
        let columnLength = tables[tableIndex].columns.length;
        let newRowInformation: string[]  = Array(columnLength).fill("");
        tables[tableIndex].InformationGrid.push(newRowInformation);
        console.log(newRow);
        console.log("added row");
    }

    function addColumnToTable(tableIndex: number, ) {
        let name: string = "Information...";

        let newColumn: tableColumn = {
            Name: name,
        }
        tables[tableIndex].columns.push(newColumn);

        //for a new Column each Row array needs to get a new entry at the end
        let rowLength = tables[tableIndex].rows.length;
        for (let rowInformationArray of tables[tableIndex].InformationGrid)
        rowInformationArray.push("");

        console.log(newColumn);
        console.log("added row");
    }

    function addExercise() {
        const exercise = newExercise.trim();
        if (!exercise) return;

        ExerciseList.push(exercise);
        newExercise = "";
    }
</script>

<input
        type="text"
        bind:value={newExercise}
        placeholder="New exercise..."
        class="border p-2 mt-2 "
/>

<button
        onclick={addExercise}
        class="px-4 py-2 bg-blue-600 text-white rounded"
>
    Add Exercise
</button>

{#if isCoach}
    <p>Coach</p>
{:else}
    <p>User</p>
{/if}

<div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Training Tracker</h1>

    <div class="overflow-x-auto">
        {#each tables as table, tableIndex}
        <table class="">
                <thead>
                    <tr>
                        <!-- header -->
                        <th class="p-2 border"> Exercise</th>
                        {#each table.columns as column, tableColumnIndex}
                            <th class="p-2 border">
                                <input
                                        type="text"
                                        class="w-full p-1 outline-none bg-transparent"
                                        bind:value={column.Name}/>
                            </th>

                        {/each}

                    </tr>
                    <!-- data -->
                    {#each table.rows as row, rowIndex}
                        <tr>
                            <td class="border p-2">
                                <input
                                        type="text"
                                        class="w-full p-1 outline-none bg-transparent"
                                        bind:value={row.Exercise}
                                />
                            </td>
                            {#each table.columns as column, columnIndex}
                                <td class="border p-2">
                                    <input
                                        type="text"
                                        class="w-full p-1 outline-none bg-transparent"
                                        bind:value={table.InformationGrid[rowIndex][columnIndex]}
                                    />
                                </td>
                                {/each}
                        </tr>
                    {/each}

                    <tr>

                    </tr>
                </thead>

        </table>
            <button
                    onclick={() => addRowToTable(tableIndex)}
                    class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                + Add Row
            </button>
            <button
                    onclick={() => addColumnToTable(tableIndex)}
                    class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
            >
                + Add Column
            </button>
                {/each}
        <button
                onclick={() => addTable()}
                class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
        >
            + Add table
        </button>
    </div>
</div>





