import { ReactNode, useState } from 'react';
import CountUp from 'react-countup';
import Select from 'react-select';
import Card from 'shared/components/card/card';
import { IEngagementRate, IEngagementRateOption } from '../interface/interface';
import { engagementOptions } from 'shared/constants';

interface IDetailsCardProps {
    label: string;
    icon: ReactNode;
    value: number | null | IEngagementRate;
    appendingString?: string;
    loading: boolean;
    avgRate?: boolean;
}

export default function DetailCard(props: IDetailsCardProps) {
    const { label, icon, value, loading, appendingString, avgRate = false } = props;
    const [selectedOption, setSelectedOption] = useState<IEngagementRateOption>({
        value: 'all',
        label: 'All Time',
    });
    return (
        <Card loading={loading}>
            <div className="card-header">
                <h3>{label}</h3>
                {icon}
            </div>
            <div className="flex align-center justify-space-between">
                <h1>
                    {!value ? (
                        '-'
                    ) : (
                        <CountUp
                            decimals={avgRate ? 2 : 0}
                            end={
                                typeof value === 'number'
                                    ? value
                                    : ((value as IEngagementRate)[
                                          selectedOption?.value || 'all'
                                      ] as number)
                            }
                            suffix={appendingString || ''}
                        />
                    )}
                </h1>
                {avgRate && (
                    <Select
                        placeholder="Range"
                        styles={{
                            container: (base: any) => {
                                return {
                                    ...base,
                                    width: '50%',
                                };
                            },
                        }}
                        value={selectedOption}
                        onChange={(value) =>
                            setSelectedOption(value || { value: 'all', label: 'All Time' })
                        }
                        options={engagementOptions}
                    />
                )}
            </div>
        </Card>
    );
}
