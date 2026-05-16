export type DefaultPipelineStageDefinition = {
  stageKey: string;
  label: string;
  color: string;
  sortOrder: number;
  isWonStage: boolean;
  isLostStage: boolean;
};

/** System default sales pipeline — matches DealrStack Phase 1 board. */
export const DEFAULT_SALES_PIPELINE_STAGES: DefaultPipelineStageDefinition[] = [
  {
    stageKey: 'new_lead',
    label: 'New Lead',
    color: 'default',
    sortOrder: 0,
    isWonStage: false,
    isLostStage: false,
  },
  {
    stageKey: 'contacted',
    label: 'Contacted',
    color: 'info',
    sortOrder: 1,
    isWonStage: false,
    isLostStage: false,
  },
  {
    stageKey: 'interested',
    label: 'Interested',
    color: 'primary',
    sortOrder: 2,
    isWonStage: false,
    isLostStage: false,
  },
  {
    stageKey: 'test_drive',
    label: 'Test Drive',
    color: 'secondary',
    sortOrder: 3,
    isWonStage: false,
    isLostStage: false,
  },
  {
    stageKey: 'negotiation',
    label: 'Negotiation',
    color: 'warning',
    sortOrder: 4,
    isWonStage: false,
    isLostStage: false,
  },
  {
    stageKey: 'deposit_paid',
    label: 'Deposit Paid',
    color: 'success',
    sortOrder: 5,
    isWonStage: false,
    isLostStage: false,
  },
  {
    stageKey: 'sold',
    label: 'Sold',
    color: 'success',
    sortOrder: 6,
    isWonStage: true,
    isLostStage: false,
  },
  {
    stageKey: 'lost',
    label: 'Lost',
    color: 'error',
    sortOrder: 7,
    isWonStage: false,
    isLostStage: true,
  },
];
