<script lang="ts">
    import type {AlertType} from "../../lib/alert.ts";
    import {AlertId, alertStore} from "../../lib/alert.ts";

    let alert: AlertType = {id: AlertId.Success, text: ""}
    let show = false

    alertStore.subscribe(a => {
        if (a) {
            alert = a
            show = true
        } else {
            show = false
        }
    })
</script>


<div class="parent" class:show>
    <div class="dialog" class:error={alert.id === AlertId.Error} class:success={alert.id === AlertId.Success}
         on:click={() => show = false}>
        {alert.text}
    </div>
</div>


<style>
    .parent {
        display: flex;
        justify-content: center;
        position: fixed;
        width: 100vw;
        bottom: -36px;
        opacity: 0;
        z-index: 3;
        transition-property: bottom, opacity;
        transition-duration: var(--transitionDuration);
    }

    .parent.show {
        bottom: 14px;
        opacity: 1;
    }

    .dialog {
        height: 36px;
        padding: 1px 16px 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        border-radius: 100px;
        overflow: hidden;
        box-shadow: var(--shadow);
        z-index: 10;
        cursor: pointer;
        transition-property: background-color, box-shadow;
        transition-duration: var(--transitionDuration);
    }

    .dialog.success {
        background-color: var(--success);
    }

    .dialog.error {
        background-color: var(--error);
    }
</style>
